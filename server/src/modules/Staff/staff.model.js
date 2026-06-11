const db = require("../../config/db");

const safeJson = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try { return JSON.parse(value); } catch { return []; }
};

const normalizeTests = (tests) => {
  const parsed = safeJson(tests);
  if (!Array.isArray(parsed)) return [];
  return parsed.map((item) => {
    if (typeof item === "string") return item;
    return item.name || item.test_name || item.title || "Test";
  });
};

async function getStaffProfileByUserId(userId) {
  const [rows] = await db.execute(
    `SELECT id, user_id, organization_name, staff_role, department, approval_status
     FROM staff_profiles WHERE user_id = ? LIMIT 1`,
    [userId]
  );
  return rows[0] || null;
}

async function getBranchLabBookings(branchName) {
  const [homeServiceRows] = await db.execute(
    `SELECT
      id,
      public_booking_id AS booking_id,
      patient_name, patient_mobile, patient_email,
      branch, tests,
      collection_date AS booking_date,
      time_slot, status, total_amount, created_at,
      'Home Service' AS source
     FROM home_service_bookings
     WHERE LOWER(TRIM(branch)) = LOWER(TRIM(?))
     ORDER BY created_at DESC`,
    [branchName]
  );

  const [diagnosticRows] = await db.execute(
    `SELECT
      id,
      receipt_id AS booking_id,
      patient_name, patient_mobile, patient_email,
      branch, tests,
      walkin_date AS booking_date,
      time_slot, status, total_amount, created_at,
      'Diagnostic Walk-in' AS source
     FROM diagnostic_walkin_bookings
     WHERE LOWER(TRIM(branch)) = LOWER(TRIM(?))
     ORDER BY created_at DESC`,
    [branchName]
  );

  const allRows = [...homeServiceRows, ...diagnosticRows];

  return allRows.map((row) => ({
    id: `${row.source}-${row.id}`,
    rawId: row.id,
    bookingId: row.booking_id,
    patientName: row.patient_name,
    mobile: row.patient_mobile,
    email: row.patient_email,
    branch: row.branch,
    source: row.source,
    tests: normalizeTests(row.tests),
    date: row.booking_date,
    timeSlot: row.time_slot,
    status: row.status,
    totalAmount: row.total_amount,
    createdAt: row.created_at,
  }));
}

async function updateWalkinStatus(id, newStatus) {
  const allowed = ["sample_received", "report_ready", "completed"];
  if (!allowed.includes(newStatus)) throw new Error(`Invalid status: ${newStatus}`);
  const [result] = await db.execute(
    `UPDATE diagnostic_walkin_bookings SET status = ? WHERE id = ?`,
    [newStatus, id]
  );
  return result.affectedRows > 0;
}

async function updateHomeServiceStatus(id, newStatus) {
  const allowed = ["processing", "report_ready", "completed", "sample_rejected"];
  if (!allowed.includes(newStatus)) throw new Error(`Invalid status: ${newStatus}`);
  const [result] = await db.execute(
    `UPDATE home_service_bookings SET status = ? WHERE id = ?`,
    [newStatus, id]
  );
  return result.affectedRows > 0;
}

async function uploadReport(bookingId, bookingType, reportPdf, uploadedBy) {
  const [result] = await db.execute(
    `INSERT INTO booking_reports (booking_id, booking_type, report_pdf, uploaded_by)
     VALUES (?, ?, ?, ?)`,
    [bookingId, bookingType, reportPdf, uploadedBy]
  );
  return result.insertId;
}

async function getReportsByBookingId(bookingId, bookingType) {
  const [rows] = await db.execute(
    `SELECT id, booking_id, booking_type, report_pdf, uploaded_at
     FROM booking_reports
     WHERE booking_id = ? AND booking_type = ?
     ORDER BY uploaded_at DESC`,
    [bookingId, bookingType]
  );
  return rows;
}

// called by patient previous bookings page
async function getReportsForUser(userId) {
  const [rows] = await db.execute(
    `SELECT
       br.id, br.booking_id, br.booking_type, br.report_pdf, br.uploaded_at,
       COALESCE(hs.patient_name, dw.patient_name) AS patient_name,
       COALESCE(hs.public_booking_id, dw.receipt_id) AS booking_ref
     FROM booking_reports br
     LEFT JOIN home_service_bookings hs
       ON br.booking_type = 'home_service' AND br.booking_id = hs.id AND hs.user_id = ?
     LEFT JOIN diagnostic_walkin_bookings dw
       ON br.booking_type = 'walkin' AND br.booking_id = dw.id AND dw.user_id = ?
     WHERE hs.id IS NOT NULL OR dw.id IS NOT NULL
     ORDER BY br.uploaded_at DESC`,
    [userId, userId]
  );
  return rows;
}

module.exports = {
  getStaffProfileByUserId,
  getBranchLabBookings,
  updateWalkinStatus,
  updateHomeServiceStatus,
  uploadReport,
  getReportsByBookingId,
  getReportsForUser,
};