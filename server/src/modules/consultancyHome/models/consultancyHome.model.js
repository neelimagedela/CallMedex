const crypto = require("crypto");
const db = require("../../../config/db");

const ALLOWED_SLOTS = [
  "09 AM - 10 AM",
  "10 AM - 11 AM",
  "11 AM - 12 PM",
  "12 PM - 01 PM",
  "02 PM - 03 PM",
  "03 PM - 04 PM",
  "04 PM - 05 PM",
  "05 PM - 06 PM",
];

function makeReceiptId() {
  return `CH${Date.now()}${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function makeError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.status = statusCode;
  return error;
}

function isPastDate(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = new Date(`${dateStr}T00:00:00`);
  return selected < today;
}

function cleanServiceIds(serviceIds) {
  if (!Array.isArray(serviceIds)) return [];

  return [...new Set(serviceIds.map(Number))].filter(
    (id) => Number.isInteger(id) && id > 0
  );
}

async function getActiveServices() {
  const [rows] = await db.execute(
    `
    SELECT
      id,
      service_code,
      service_name,
      service_group,
      description,
      price
    FROM consultancy_home_services
    WHERE is_active = TRUE
    ORDER BY sort_order ASC, id ASC
    `
  );

  return rows.map((row) => ({
    ...row,
    price: Number(row.price || 0),
  }));
}

async function getPatientDetails(userId) {
  const [rows] = await db.execute(
    `
    SELECT
      id,
      public_user_id,
      name,
      phone,
      email,
      role,
      CONCAT_WS(', ',
        NULLIF(address, ''),
        NULLIF(city, ''),
        NULLIF(district, ''),
        NULLIF(state, ''),
        NULLIF(pincode, ''),
        NULLIF(country, '')
      ) AS address
    FROM users
    WHERE id = ?
      AND role = 'patient'
    LIMIT 1
    `,
    [userId]
  );

  return rows[0];
}

async function getBookedSlots(appointmentDate) {
  const [rows] = await db.execute(
    `
    SELECT time_slot
    FROM consultancy_home_bookings
    WHERE appointment_date = ?
      AND booking_status IN ('pending', 'confirmed')
    `,
    [appointmentDate]
  );

  return rows.map((row) => row.time_slot);
}

async function getServicesByIds(serviceIds) {
  const cleanIds = cleanServiceIds(serviceIds);

  if (cleanIds.length === 0) return [];

  const placeholders = cleanIds.map(() => "?").join(",");

  const [rows] = await db.execute(
    `
    SELECT
      id,
      service_name,
      price
    FROM consultancy_home_services
    WHERE is_active = TRUE
      AND id IN (${placeholders})
    `,
    cleanIds
  );

  return rows.map((row) => ({
    ...row,
    price: Number(row.price || 0),
  }));
}

async function createBooking({ userId, appointmentDate, timeSlot, serviceIds }) {
  if (!userId) {
    throw makeError("User not authenticated", 401);
  }

  if (isPastDate(appointmentDate)) {
    throw makeError("Previous dates are not allowed", 400);
  }

  if (!ALLOWED_SLOTS.includes(timeSlot)) {
    throw makeError("Invalid time slot", 400);
  }

  const uniqueServiceIds = cleanServiceIds(serviceIds);

  if (uniqueServiceIds.length === 0) {
    throw makeError("Select at least one service", 400);
  }

  const patient = await getPatientDetails(userId);

  if (!patient) {
    throw makeError("Only patient accounts can book Consultation at Home", 403);
  }

  if (!patient.public_user_id) {
    throw makeError("Patient public ID is missing. Please verify your account.", 400);
  }

  if (!patient.address || patient.address.trim().length < 8) {
    throw makeError("Patient address is required", 400);
  }

  const bookedSlots = await getBookedSlots(appointmentDate);

  if (bookedSlots.includes(timeSlot)) {
    throw makeError("This slot is already booked", 409);
  }

  const services = await getServicesByIds(uniqueServiceIds);

  if (services.length !== uniqueServiceIds.length) {
    throw makeError("Invalid selected service", 400);
  }

  const totalAmount = services.reduce(
    (sum, service) => sum + Number(service.price || 0),
    0
  );

  const receiptId = makeReceiptId();
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [bookingResult] = await connection.execute(
      `
      INSERT INTO consultancy_home_bookings
      (
        receipt_id,
        user_id,
        patient_public_id,
        patient_name,
        patient_phone,
        patient_email,
        patient_address,
        appointment_date,
        time_slot,
        total_amount
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        receiptId,
        patient.id,
        patient.public_user_id,
        patient.name,
        patient.phone,
        patient.email,
        patient.address,
        appointmentDate,
        timeSlot,
        totalAmount,
      ]
    );

    const bookingId = bookingResult.insertId;

    for (const service of services) {
      await connection.execute(
        `
        INSERT INTO consultancy_home_booking_items
        (
          booking_id,
          service_id,
          service_name,
          price,
          quantity,
          line_total
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          bookingId,
          service.id,
          service.service_name,
          service.price,
          1,
          service.price,
        ]
      );
    }

    await connection.commit();

    return getBookingById(bookingId, userId);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function getBookingById(bookingId, userId) {
  const [bookings] = await db.execute(
    `
    SELECT *
    FROM consultancy_home_bookings
    WHERE id = ?
      AND user_id = ?
    LIMIT 1
    `,
    [bookingId, userId]
  );

  if (!bookings[0]) return null;

  const [items] = await db.execute(
    `
    SELECT
      service_name,
      price,
      quantity,
      line_total
    FROM consultancy_home_booking_items
    WHERE booking_id = ?
    `,
    [bookingId]
  );

  return {
    ...bookings[0],
    total_amount: Number(bookings[0].total_amount || 0),
    items: items.map((item) => ({
      ...item,
      price: Number(item.price || 0),
      line_total: Number(item.line_total || 0),
    })),
  };
}

module.exports = {
  ALLOWED_SLOTS,
  getActiveServices,
  getPatientDetails,
  getBookedSlots,
  createBooking,
  getBookingById,
};