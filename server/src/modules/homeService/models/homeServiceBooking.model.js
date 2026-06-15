const crypto = require("crypto");
const db = require("../../../config/db");

function generatePublicBookingId() {
  return `HS${Date.now()}${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function parseJsonArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeBooking(row) {
  return {
    id: row.id,
    publicBookingId: row.public_booking_id,
    userId: row.user_id,
    assignedPhleboId: row.assigned_phlebo_id,
    patientName: row.patient_name,
    patientAge: row.patient_age,
    patientSex: row.patient_sex,
    patientMobile: row.patient_mobile,
    patientEmail: row.patient_email,
    patientAddress: row.patient_address,
    patientLat: row.patient_lat,
    patientLng: row.patient_lng,
    branch: row.branch,
    tests: parseJsonArray(row.tests),
    collectionDate: row.collection_date,
    timeSlot: row.time_slot,
    prescriptionPath: row.prescription_path,
    totalAmount: Number(row.total_amount || 0),
    status: row.status,
    phleboNotes: row.phlebo_notes || "",
    distanceKm:
      row.distance_km === undefined || row.distance_km === null
        ? null
        : Number(row.distance_km).toFixed(2),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    acceptedAt: row.accepted_at,
  };
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
      assigned_phlebo_id,
      patient_name,
      patient_age,
      patient_sex,
      patient_mobile,
      patient_email,
      patient_address,
      patient_lat,
      patient_lng,
      branch,
      tests,
      collection_date,
      time_slot,
      prescription_path,
      total_amount,
      status
    )
    VALUES (?, ?, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      bookingData.patientLat || null,
      bookingData.patientLng || null,
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

const getPhleboProfileByUserId = async (phleboUserId) => {
  const [rows] = await db.execute(
    `
    SELECT
      u.id AS user_id,
      u.public_user_id,
      u.name,
      u.email,
      u.phone,
      u.role,
      pp.id AS profile_id,
      pp.phlebo_type,
      pp.qualification,
      pp.specialization,
      pp.years_of_experience,
      pp.certification_number,
      pp.available_days,
      pp.available_time,
      pp.morning_start,
      pp.morning_end,
      pp.evening_start,
      pp.evening_end,
      pp.home_collection,
      pp.emergency_availability,
      pp.government_id_type,
      pp.aadhaar_front,
      pp.phlebotomy_certificate,
      pp.created_at,
      pp.updated_at
    FROM users u
    LEFT JOIN phlebo_profiles pp
      ON pp.user_id = u.id
    WHERE u.id = ?
      AND u.role = 'phlebo'
    LIMIT 1
    `,
    [phleboUserId]
  );

  return rows[0] || null;
};

const upsertPhleboLiveLocation = async ({
  phleboUserId,
  latitude,
  longitude,
  isAvailable = true,
}) => {
  await db.execute(
    `
    INSERT INTO phlebo_live_locations (
      phlebo_user_id,
      latitude,
      longitude,
      is_available
    )
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      latitude = VALUES(latitude),
      longitude = VALUES(longitude),
      is_available = VALUES(is_available),
      last_updated = CURRENT_TIMESTAMP
    `,
    [phleboUserId, latitude, longitude, isAvailable ? 1 : 0]
  );

  return {
    phleboUserId,
    latitude,
    longitude,
    isAvailable,
  };
};

const getPhleboLiveLocation = async (phleboUserId) => {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM phlebo_live_locations
    WHERE phlebo_user_id = ?
      AND is_available = TRUE
    LIMIT 1
    `,
    [phleboUserId]
  );

  return rows[0] || null;
};

const getNearbyPendingBookingsForPhlebo = async (
  phleboUserId,
  radiusKm = 10
) => {
  const location = await getPhleboLiveLocation(phleboUserId);

  if (!location) return [];

  const phleboLat = Number(location.latitude);
  const phleboLng = Number(location.longitude);

  const [rows] = await db.execute(
    `
    SELECT
      hsb.*,
      (
        6371 * ACOS(
          COS(RADIANS(?)) *
          COS(RADIANS(hsb.patient_lat)) *
          COS(RADIANS(hsb.patient_lng) - RADIANS(?)) +
          SIN(RADIANS(?)) *
          SIN(RADIANS(hsb.patient_lat))
        )
      ) AS distance_km
    FROM home_service_bookings hsb
    WHERE hsb.assigned_phlebo_id IS NULL
      AND hsb.status = 'pending'
      AND hsb.patient_lat IS NOT NULL
      AND hsb.patient_lng IS NOT NULL
    HAVING distance_km <= ?
    ORDER BY distance_km ASC, hsb.created_at ASC
    `,
    [phleboLat, phleboLng, phleboLat, radiusKm]
  );

  return rows.map(normalizeBooking);
};

const getAssignedBookingsForPhlebo = async (phleboUserId) => {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM home_service_bookings
    WHERE assigned_phlebo_id = ?
      AND status IN ('accepted', 'sample_collected', 'submitted_to_lab')
    ORDER BY collection_date ASC, created_at DESC
    `,
    [phleboUserId]
  );

  return rows.map(normalizeBooking);
};

const getPhleboHomeServiceBookings = async (phleboUserId) => {
  const nearbyPending = await getNearbyPendingBookingsForPhlebo(
    phleboUserId,
    10
  );

  const assigned = await getAssignedBookingsForPhlebo(phleboUserId);

  return [...nearbyPending, ...assigned];
};

const getCompletedBookingsForPhlebo = async (phleboUserId) => {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM home_service_bookings
    WHERE assigned_phlebo_id = ?
      AND status = 'completed'
    ORDER BY updated_at DESC, collection_date DESC, created_at DESC
    `,
    [phleboUserId]
  );

  return rows.map(normalizeBooking);
};

const getRejectedBookingsForPhlebo = async (phleboUserId) => {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM home_service_bookings
    WHERE assigned_phlebo_id = ?
      AND status = 'sample_rejected'
    ORDER BY updated_at DESC
    `,
    [phleboUserId]
  );

  return rows.map(normalizeBooking);
};

const resubmitRejectedBooking = async (bookingId, phleboUserId) => {
  const [result] = await db.execute(
    `
    UPDATE home_service_bookings
    SET status = 'submitted_to_lab'
    WHERE id = ?
      AND assigned_phlebo_id = ?
      AND status = 'sample_rejected'
    `,
    [bookingId, phleboUserId]
  );

  return result.affectedRows > 0;
};

const acceptHomeServiceBooking = async (bookingId, phleboUserId) => {
  const bId = Number(bookingId);
  const pId = Number(phleboUserId);

  const [rows] = await db.execute(
    `
    SELECT
      id,
      assigned_phlebo_id,
      status
    FROM home_service_bookings
    WHERE id = ?
    LIMIT 1
    `,
    [bId]
  );

  const booking = rows[0];

  if (!booking) {
    return {
      accepted: false,
      reason: "not_found",
    };
  }

  if (
    booking.assigned_phlebo_id &&
    Number(booking.assigned_phlebo_id) === pId &&
    ["accepted", "sample_collected", "submitted_to_lab"].includes(
      booking.status
    )
  ) {
    return {
      accepted: true,
      alreadyAssignedToMe: true,
    };
  }

  if (
    booking.assigned_phlebo_id &&
    Number(booking.assigned_phlebo_id) !== pId
  ) {
    return {
      accepted: false,
      reason: "accepted_by_another",
    };
  }

  if (booking.status !== "pending") {
    return {
      accepted: false,
      reason: "not_pending",
    };
  }

  const [result] = await db.execute(
    `
    UPDATE home_service_bookings
    SET
      assigned_phlebo_id = ?,
      status = 'accepted',
      accepted_at = NOW(),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
      AND assigned_phlebo_id IS NULL
      AND status = 'pending'
    `,
    [pId, bId]
  );

  return {
    accepted: result.affectedRows > 0,
    reason: result.affectedRows > 0 ? null : "race_condition",
  };
};

const getPhleboActiveBooking = async (phleboUserId) => {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM home_service_bookings
    WHERE assigned_phlebo_id = ?
      AND status IN ('accepted', 'sample_collected', 'submitted_to_lab')
    ORDER BY accepted_at DESC, created_at DESC
    LIMIT 1
    `,
    [phleboUserId]
  );

  return rows[0] ? normalizeBooking(rows[0]) : null;
};

const updateHomeServiceBookingStatus = async (
  bookingId,
  phleboUserId,
  status,
  phleboNotes
) => {
  const allowedStatuses = [
    "accepted",
    "sample_collected",
    "submitted_to_lab",
    "sample_rejected",
    "processing",
    "report_ready",
    "completed",
    "cancelled",
  ];

  if (!allowedStatuses.includes(status)) return false;

  const [result] = await db.execute(
    `
    UPDATE home_service_bookings
    SET
      status = ?,
      phlebo_notes = COALESCE(?, phlebo_notes),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
      AND assigned_phlebo_id = ?
    `,
    [status, phleboNotes || null, bookingId, phleboUserId]
  );

  return result.affectedRows > 0;
};

const getPhleboWalletSummary = async (phleboUserId) => {
  const TASK_AMOUNT = 150;

  const [summaryRows] = await db.execute(
    `
    SELECT
      COUNT(*) AS completed_tasks,
      COALESCE(COUNT(*) * ?, 0) AS wallet_balance
    FROM home_service_bookings
    WHERE assigned_phlebo_id = ?
      AND status = 'completed'
    `,
    [TASK_AMOUNT, phleboUserId]
  );

  const [transactions] = await db.execute(
    `
    SELECT
      id,
      public_booking_id,
      patient_name,
      patient_mobile,
      branch,
      collection_date,
      time_slot,
      status,
      updated_at,
      ? AS amount
    FROM home_service_bookings
    WHERE assigned_phlebo_id = ?
      AND status = 'completed'
    ORDER BY updated_at DESC, collection_date DESC, created_at DESC
    `,
    [TASK_AMOUNT, phleboUserId]
  );

  return {
    amountPerTask: TASK_AMOUNT,
    completedTasks: Number(summaryRows[0]?.completed_tasks || 0),
    walletBalance: Number(summaryRows[0]?.wallet_balance || 0),
    transactions,
  };
};

const getSupervisorPhleboWalletSummary = async (
  phleboUserId,
  branchNames
) => {
  const TASK_AMOUNT = 150;

  const placeholders = branchNames.map(() => "?").join(",");

  const [summaryRows] = await db.execute(
    `
    SELECT
      COUNT(*) AS completed_tasks,
      COALESCE(COUNT(*) * ?, 0) AS wallet_balance
    FROM home_service_bookings
    WHERE assigned_phlebo_id = ?
      AND status = 'completed'
      AND LOWER(TRIM(branch)) IN (${placeholders})
    `,
    [
      TASK_AMOUNT,
      phleboUserId,
      ...branchNames.map((b) => b.toLowerCase().trim()),
    ]
  );

  const [transactions] = await db.execute(
    `
    SELECT
      id,
      public_booking_id,
      patient_name,
      patient_mobile,
      branch,
      collection_date,
      time_slot,
      status,
      updated_at,
      ? AS amount
    FROM home_service_bookings
    WHERE assigned_phlebo_id = ?
      AND status = 'completed'
      AND LOWER(TRIM(branch)) IN (${placeholders})
    ORDER BY updated_at DESC
    `,
    [
      TASK_AMOUNT,
      phleboUserId,
      ...branchNames.map((b) => b.toLowerCase().trim()),
    ]
  );

  return {
    amountPerTask: TASK_AMOUNT,
    completedTasks: Number(summaryRows[0]?.completed_tasks || 0),
    walletBalance: Number(summaryRows[0]?.wallet_balance || 0),
    transactions,
  };
};

module.exports = {
  createHomeServiceBooking,
  getPhleboProfileByUserId,
  upsertPhleboLiveLocation,
  getPhleboHomeServiceBookings,
  getCompletedBookingsForPhlebo,
  getRejectedBookingsForPhlebo,
  resubmitRejectedBooking,
  acceptHomeServiceBooking,
  getPhleboActiveBooking,
  updateHomeServiceBookingStatus,
  getPhleboWalletSummary,
  getSupervisorPhleboWalletSummary,
};