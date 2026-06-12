const db = require("../../config/db");

const safeJson = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const normalizeTests = (tests) => {
  const parsed = safeJson(tests);

  return parsed.map((item) => {
    if (typeof item === "string") return item;

    return (
      item.name ||
      item.test_name ||
      item.testName ||
      item.title ||
      item.test_code ||
      item.subtitle ||
      "Test"
    );
  });
};

async function getStaffProfileByUserId(userId) {
  const [rows] = await db.execute(
    `
    SELECT
      sp.id,
      sp.user_id,
      sp.organization_name,
      sp.staff_role,
      sp.department,
      sp.approval_status,
      u.name AS staff_name,
      u.email AS staff_email,
      u.phone AS staff_phone
    FROM staff_profiles sp
    JOIN users u ON u.id = sp.user_id
    WHERE sp.user_id = ?
    LIMIT 1
    `,
    [userId]
  );

  return rows[0] || null;
}

async function getBranchLabBookings(branchName) {
  const [homeServiceRows] = await db.execute(
    `
    SELECT
      h.id,
      h.public_booking_id AS booking_id,
      h.user_id,
      u.name AS booked_account_name,
      u.email AS booked_account_email,
      h.patient_name,
      h.patient_mobile,
      h.patient_email,
      h.branch,
      h.tests,
      h.collection_date AS booking_date,
      h.time_slot,
      h.status,
      h.total_amount,
      h.created_at,
      'Home Service' AS source
    FROM home_service_bookings h
    LEFT JOIN users u ON u.id = h.user_id
    WHERE LOWER(TRIM(h.branch)) = LOWER(TRIM(?))
    ORDER BY h.created_at DESC
    `,
    [branchName]
  );

  const [diagnosticRows] = await db.execute(
    `
    SELECT
      d.id,
      d.receipt_id AS booking_id,
      d.user_id,
      u.name AS booked_account_name,
      u.email AS booked_account_email,
      d.patient_name,
      d.patient_mobile,
      d.patient_email,
      d.branch,
      d.tests,
      d.walkin_date AS booking_date,
      d.time_slot,
      d.status,
      d.total_amount,
      d.created_at,
      'Diagnostic Walk-in' AS source
    FROM diagnostic_walkin_bookings d
    LEFT JOIN users u ON u.id = d.user_id
    WHERE LOWER(TRIM(d.branch)) = LOWER(TRIM(?))
    ORDER BY d.created_at DESC
    `,
    [branchName]
  );

  const [scanRows] = await db.execute(
    `
    SELECT
      a.id,
      a.receipt_id AS booking_id,
      a.user_id,
      u.name AS booked_account_name,
      u.email AS booked_account_email,
      a.patient_name,
      a.patient_mobile,
      a.patient_email,
      a.branch,
      a.scans AS tests,
      a.appointment_date AS booking_date,
      a.time_slot,
      a.status,
      a.total_amount,
      a.created_at,
      'Scan Appointment' AS source
    FROM appointments a
    LEFT JOIN users u ON u.id = a.user_id
    WHERE LOWER(TRIM(a.branch)) = LOWER(TRIM(?))
    ORDER BY a.created_at DESC
    `,
    [branchName]
  );

  const allRows = [...homeServiceRows, ...diagnosticRows, ...scanRows];

  return allRows.map((row) => ({
    id: `${row.source}-${row.id}`,
    rawId: row.id,
    userId: row.user_id,
    bookingId: row.booking_id,
    bookedAccountName: row.booked_account_name,
    bookedAccountEmail: row.booked_account_email,
    patientName: row.patient_name,
    mobile: row.patient_mobile,
    email: row.patient_email,
    branch: row.branch,
    source: row.source,
    tests: normalizeTests(row.tests),
    date: row.booking_date,
    timeSlot: row.time_slot,
    status: row.status,
    totalAmount: Number(row.total_amount || 0),
    createdAt: row.created_at,
  }));
}

async function updateWalkinStatus(id, newStatus) {
  const allowed = [
    "sample_received",
    "report_ready",
    "completed",
    "cancelled",
  ];

  if (!allowed.includes(newStatus)) {
    throw new Error(`Invalid status: ${newStatus}`);
  }

  const [result] = await db.execute(
    `
    UPDATE diagnostic_walkin_bookings
    SET status = ?
    WHERE id = ?
    `,
    [newStatus, id]
  );

  return result.affectedRows > 0;
}

async function updateScanStatus(id, newStatus) {
  const allowed = [
    "sample_received",
    "report_ready",
    "completed",
    "cancelled",
  ];

  if (!allowed.includes(newStatus)) {
    throw new Error(`Invalid status: ${newStatus}`);
  }

  const [result] = await db.execute(
    `
    UPDATE appointments
    SET status = ?
    WHERE id = ?
    `,
    [newStatus, id]
  );

  return result.affectedRows > 0;
}

async function updateHomeServiceStatus(id, newStatus) {
  const allowed = [
    "processing",
    "report_ready",
    "completed",
    "sample_rejected",
  ];

  if (!allowed.includes(newStatus)) {
    throw new Error(`Invalid status: ${newStatus}`);
  }
console.log("STATUS BEING SAVED:", newStatus);
  const [result] = await db.execute(
    `
    UPDATE home_service_bookings
    SET status = ?
    WHERE id = ?
    `,
    [newStatus, id]
  );

  return result.affectedRows > 0;
}

async function uploadReport(bookingId, bookingType, reportPdf, uploadedBy) {
  const [result] = await db.execute(
    `
    INSERT INTO booking_reports (
      booking_id,
      booking_type,
      report_pdf,
      uploaded_by
    )
    VALUES (?, ?, ?, ?)
    `,
    [bookingId, bookingType, reportPdf, uploadedBy]
  );

  return result.insertId;
}

async function getReportsByBookingId(bookingId, bookingType) {
  const [rows] = await db.execute(
    `
    SELECT
      id,
      booking_id,
      booking_type,
      report_pdf,
      uploaded_at
    FROM booking_reports
    WHERE booking_id = ?
      AND booking_type = ?
    ORDER BY uploaded_at DESC
    `,
    [bookingId, bookingType]
  );

  return rows;
}

async function getReportsForUser(userId) {
  const [rows] = await db.execute(
    `
    SELECT
      br.id,
      br.booking_id,
      br.booking_type,
      br.report_pdf,
      br.uploaded_at,
      COALESCE(h.patient_name, d.patient_name, a.patient_name) AS patient_name,
      COALESCE(h.patient_email, d.patient_email, a.patient_email) AS patient_email,
      COALESCE(h.public_booking_id, d.receipt_id, a.receipt_id) AS booking_ref
    FROM booking_reports br
    LEFT JOIN home_service_bookings h
      ON br.booking_type = 'home_service'
      AND br.booking_id = h.id
    LEFT JOIN diagnostic_walkin_bookings d
      ON br.booking_type = 'walkin'
      AND br.booking_id = d.id
    LEFT JOIN appointments a
      ON br.booking_type = 'scan'
      AND br.booking_id = a.id
    WHERE (br.booking_type = 'home_service' AND h.user_id = ? AND h.status = 'completed')
       OR (br.booking_type = 'walkin' AND d.user_id = ? AND d.status = 'completed')
       OR (br.booking_type = 'scan' AND a.user_id = ? AND a.status = 'completed')
    ORDER BY br.uploaded_at DESC
    `,
    [userId, userId, userId]
  );

  return rows;
}

module.exports = {
  getStaffProfileByUserId,
  getBranchLabBookings,
  updateWalkinStatus,
  updateScanStatus,
  updateHomeServiceStatus,
  uploadReport,
  getReportsByBookingId,
  getReportsForUser,
};