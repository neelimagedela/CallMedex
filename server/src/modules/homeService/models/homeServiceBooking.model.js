const crypto = require("crypto");
const db = require("../../../config/db");

function generatePublicBookingId() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const random = crypto.randomBytes(3).toString("hex").toUpperCase();

  return `HS${year}${month}${day}${random}`;
}

const createHomeServiceBooking = async (bookingData) => {
  const publicBookingId = generatePublicBookingId();

  const testsJson = Array.isArray(bookingData.tests)
    ? JSON.stringify(bookingData.tests)
    : JSON.stringify([]);

  const [result] = await db.execute(
    `
    INSERT INTO home_service_bookings (
      public_booking_id,
      user_id,
      patient_name,
      patient_age,
      patient_sex,
      patient_mobile,
      patient_email,
      patient_address,
      branch,
      tests,
      collection_date,
      time_slot,
      prescription_path,
      total_amount,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      publicBookingId,
      bookingData.userId,
      bookingData.patientName,
      bookingData.patientAge,
      bookingData.patientSex,
      bookingData.patientMobile,
      bookingData.patientEmail,
      bookingData.patientAddress,
      bookingData.branch,
      testsJson,
      bookingData.collectionDate,
      bookingData.timeSlot,
      bookingData.prescriptionPath || null,
      bookingData.totalAmount,
      bookingData.status || "pending",
    ]
  );

  return {
    id: result.insertId,
    publicBookingId,
    ...bookingData,
  };
};

const getPhleboHomeServiceBookings = async (phleboUserId) => {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM home_service_bookings
    WHERE assigned_phlebo_id = ?
    ORDER BY collection_date ASC, created_at DESC
    `,
    [phleboUserId]
  );

  return rows;
};

module.exports = {
  createHomeServiceBooking,
  getPhleboHomeServiceBookings,
};