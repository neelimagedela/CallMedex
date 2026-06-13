const db = require("../../config/db");

/**
 * Fetch supervisor's branch from the users table using their internal user ID.
 * The branch value (e.g. "Akkayapalem") is used to scope all supervisor queries.
 */
const getSupervisorBranch = async (userId) => {
  const [rows] = await db.execute(
    `SELECT branch FROM users WHERE id = ? LIMIT 1`,
    [userId]
  );
  return rows[0]?.branch || null;
};

/**
 * Dashboard summary counts — all filtered by branch.
 */
const getDashboardSummary = async (branch) => {
  const normalizedBranch =
    branch === "Akkayyapalem"
      ? "Akkayapalem"
      : branch;

  console.log("DASHBOARD BRANCH:", branch);
  console.log("NORMALIZED BRANCH:", normalizedBranch);

  const [[staffRow]] = await db.execute(
    `SELECT
       COUNT(*) AS totalStaff,
       SUM(approval_status = 'pending')  AS pendingStaff,
       SUM(approval_status = 'approved') AS approvedStaff
     FROM staff_profiles
     WHERE organization_name = ?`,
    [branch]
  );

  const [[scanRow]] = await db.execute(
  `SELECT COUNT(*) AS cnt
   FROM appointments
   WHERE branch = ?`,
  [normalizedBranch]
);

const [[homeRow]] = await db.execute(
  `SELECT COUNT(*) AS cnt
   FROM home_service_bookings
   WHERE branch = ?`,
  [normalizedBranch]
);

const [[walkinRow]] = await db.execute(
  `SELECT COUNT(*) AS cnt
   FROM diagnostic_walkin_bookings
   WHERE branch = ?`,
  [normalizedBranch]
);

const totalAppointments =
  Number(scanRow.cnt || 0) +
  Number(homeRow.cnt || 0) +
  Number(walkinRow.cnt || 0);

console.log("SCAN COUNT:", scanRow);
console.log("HOME COUNT:", homeRow);
console.log("WALKIN COUNT:", walkinRow);
console.log("TOTAL APPOINTMENTS:", totalAppointments);

  const [[patientRow]] = await db.execute(
    `SELECT
       COUNT(DISTINCT user_id) AS totalPatients
     FROM appointments
     WHERE branch = ?`,
    [normalizedBranch]
  );

  const [phleboRows] = await db.execute(`
  SELECT
    phlebo_type,
    available_days,
    morning_start,
    morning_end,
    evening_start,
    evening_end
  FROM phlebo_profiles
`);

const totalPhlebos = phleboRows.length;

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
});

let activePhlebos = 0;

for (const p of phleboRows) {

  // Full-time phlebos are always active
  if (p.phlebo_type === "fullTime") {
    activePhlebos++;
    continue;
  }

  // Part-time phlebos active if today is in available_days
  let days = p.available_days;

  if (typeof days === "string") {
    days = JSON.parse(days);
  }

  if (Array.isArray(days) && days.includes(today)) {
    activePhlebos++;
  }
}

 return {
  totalStaff: Number(staffRow.totalStaff) || 0,
  pendingStaff: Number(staffRow.pendingStaff) || 0,
  approvedStaff: Number(staffRow.approvedStaff) || 0,
  totalPatients: Number(patientRow.totalPatients) || 0,
  totalAppointments,
  
  totalPhlebos,
  activePhlebos,
};
};

/**
 * Staff list filtered by organization_name (= supervisor's branch).
 * Joins users table for name and email; returns safe fields only.
 */
const getStaffList = async (branch, search = "") => {
  const normalizedBranch = branch === "Akkayyapalem" ? "Akkayapalem" : branch;
  const term = `%${search}%`;
  const [rows] = await db.execute(
    `SELECT
       sp.id,
       u.name,
       u.email,
       sp.staff_role AS role,
       sp.department,
       sp.approval_status,
       sp.created_at,
       (
         SELECT COUNT(*) FROM booking_reports br
         LEFT JOIN home_service_bookings h ON br.booking_type = 'home_service' AND br.booking_id = h.id
         LEFT JOIN diagnostic_walkin_bookings d ON br.booking_type = 'walkin' AND br.booking_id = d.id
         LEFT JOIN appointments a ON br.booking_type = 'scan' AND br.booking_id = a.id
         WHERE br.uploaded_by = u.id
           AND COALESCE(h.status, d.status, a.status) = 'completed'
       ) AS completedTaskCount,
       (
         SELECT COUNT(*) FROM booking_reports WHERE uploaded_by = u.id
       ) AS reportCount,
       COALESCE(
         (SELECT MAX(uploaded_at) FROM booking_reports WHERE uploaded_by = u.id),
         sp.updated_at,
         u.updated_at
       ) AS lastActivity
     FROM staff_profiles sp
     JOIN users u ON u.id = sp.user_id
     WHERE sp.organization_name = ?
       AND (? = '' OR u.name LIKE ? OR u.email LIKE ? OR sp.staff_role LIKE ? OR sp.department LIKE ?)
     ORDER BY lastActivity DESC`,
    [normalizedBranch, search, term, term, term, term]
  );
  return rows;
};

/**
 * Update staff approval_status. Allowed values enforced here, not just in controller.
 */
const updateStaffApprovalStatus = async (staffProfileId, status) => {
  const ALLOWED = ["approved", "rejected", "pending"];
  if (!ALLOWED.includes(status)) {
    throw new Error("Invalid approval status value");
  }

  const [result] = await db.execute(
    `UPDATE staff_profiles SET approval_status = ? WHERE id = ?`,
    [status, staffProfileId]
  );
  return result.affectedRows;
};

/**
 * Verify that a staff_profiles row belongs to this supervisor's branch,
 * preventing cross-branch tampering.
 */
const verifyStaffBelongsToBranch = async (staffProfileId, branch) => {
  const [rows] = await db.execute(
    `SELECT id FROM staff_profiles WHERE id = ? AND organization_name = ? LIMIT 1`,
    [staffProfileId, branch]
  );
  return rows.length > 0;
};

/**
 * Patients & Appointments — union of appointments + home_service_bookings filtered by branch.
 */
const getPatientsAndAppointments = async (branch, search = "") => {
  const normalizedBranch = branch === "Akkayyapalem" ? "Akkayapalem" : branch;
  const term = `%${search}%`;

  const hQuery = `
    SELECT
      patient_name AS patientName,
      patient_email AS patientEmail,
      patient_mobile AS patientMobile,
      'home_service' AS bookingType,
      public_booking_id AS bookingId,
      collection_date AS date,
      time_slot AS timeSlot,
      patient_address AS branchAddress,
      status,
      tests AS service,
      created_at AS createdAt
    FROM home_service_bookings
    WHERE branch = ?
      AND (? = '' OR patient_name LIKE ? OR patient_email LIKE ? OR patient_mobile LIKE ? OR public_booking_id LIKE ?)
  `;

  const aQuery = `
    SELECT
      patient_name AS patientName,
      patient_email AS patientEmail,
      patient_mobile AS patientMobile,
      'scan_appointment' AS bookingType,
      receipt_id AS bookingId,
      appointment_date AS date,
      time_slot AS timeSlot,
      branch AS branchAddress,
      status,
      scans AS service,
      created_at AS createdAt
    FROM appointments
    WHERE branch = ?
      AND (? = '' OR patient_name LIKE ? OR patient_email LIKE ? OR patient_mobile LIKE ? OR receipt_id LIKE ?)
  `;

  const wQuery = `
    SELECT
      patient_name AS patientName,
      patient_email AS patientEmail,
      patient_mobile AS patientMobile,
      'walkin_center' AS bookingType,
      receipt_id AS bookingId,
      walkin_date AS date,
      time_slot AS timeSlot,
      branch AS branchAddress,
      status,
      tests AS service,
      created_at AS createdAt
    FROM diagnostic_walkin_bookings
    WHERE branch = ?
      AND (? = '' OR patient_name LIKE ? OR patient_email LIKE ? OR patient_mobile LIKE ? OR receipt_id LIKE ?)
  `;

  const dpQuery = `
    SELECT
      dp.patient_name AS patientName,
      dp.patient_email AS patientEmail,
      dp.patient_mobile AS patientMobile,
      'diagnostic_package' AS bookingType,
      dp.receipt_id AS bookingId,
      dp.appointment_date AS date,
      dp.time_slot AS timeSlot,
      dp.patient_address AS branchAddress,
      dp.booking_status AS status,
      dp.package_name AS service,
      dp.created_at AS createdAt
    FROM diagnostic_package_bookings dp
    JOIN users u ON dp.user_id = u.id
    WHERE u.branch = ?
      AND (? = '' OR dp.patient_name LIKE ? OR dp.patient_email LIKE ? OR dp.patient_mobile LIKE ? OR dp.receipt_id LIKE ?)
  `;

  const cQuery = `
    SELECT
      patient_name AS patientName,
      patient_email AS patientEmail,
      patient_mobile AS patientMobile,
      'clinic_appointment' AS bookingType,
      receipt_id AS bookingId,
      appointment_date AS date,
      time_slot AS timeSlot,
      clinic_branch AS branchAddress,
      status,
      'Doctor Consultation' AS service,
      created_at AS createdAt
    FROM clinic_appointments
    WHERE clinic_branch = ?
      AND (? = '' OR patient_name LIKE ? OR patient_email LIKE ? OR patient_mobile LIKE ? OR receipt_id LIKE ?)
  `;

  const [hRows, aRows, wRows, dpRows, cRows] = await Promise.all([
    db.execute(hQuery, [normalizedBranch, search, term, term, term, term]),
    db.execute(aQuery, [normalizedBranch, search, term, term, term, term]),
    db.execute(wQuery, [normalizedBranch, search, term, term, term, term]),
    db.execute(dpQuery, [normalizedBranch, search, term, term, term, term]),
    db.execute(cQuery, [normalizedBranch, search, term, term, term, term]),
  ]);

  const all = [
    ...hRows[0],
    ...aRows[0],
    ...wRows[0],
    ...dpRows[0],
    ...cRows[0]
  ];

  return all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

/**
 * Organization profile for this branch.
 */
const getOrganizationProfile = async (userId) => {
  const [rows] = await db.execute(
    `SELECT
       op.institution_name,
       op.license_number,
       op.head_of_institution,
       op.alt_phone,
       op.emergency_phone,
       u.branch
     FROM organization_profiles op
     JOIN users u ON u.id = op.user_id
     WHERE op.user_id = ?`,
    [userId]
  );

  return rows[0] || null;
};

/**
 * Update organization profile — safe parameterized update.
 */
const updateOrganizationProfile = async (userId, fields) => {
  const {
    institutionName,
    licenseNumber,
    headOfInstitution,
    contactDetails,
  } = fields;

  const [result] = await db.execute(
    `UPDATE organization_profiles
     SET
       institution_name    = COALESCE(?, institution_name),
       license_number      = COALESCE(?, license_number),
       head_of_institution = COALESCE(?, head_of_institution),
       updated_at          = NOW()
     WHERE user_id = ?`,
    [
      institutionName || null,
      licenseNumber || null,
      headOfInstitution || null,
      userId,
    ]
  );

  return result.affectedRows;
};

/**
 * Reports — simple counts for this branch.
 */
const getReportCounts = async (branch) => {
  const [[staffRow]] = await db.execute(
    `SELECT COUNT(*) AS cnt FROM staff_profiles WHERE organization_name = ?`,
    [branch]
  );

  const [[apptRow]] = await db.execute(
    `SELECT COUNT(*) AS cnt FROM appointments WHERE branch = ?`,
    [branch]
  );

  const [[patientRow]] = await db.execute(
    `SELECT COUNT(DISTINCT user_id) AS cnt FROM appointments WHERE branch = ?`,
    [branch]
  );

  const [[homeRow]] = await db.execute(
    `SELECT COUNT(*) AS cnt FROM home_service_bookings WHERE branch = ?`,
    [branch]
  );

  return {
    staffCount:       Number(staffRow.cnt)   || 0,
    appointmentCount: Number(apptRow.cnt)    || 0,
    patientCount:     Number(patientRow.cnt) || 0,
    homeServiceCount: Number(homeRow.cnt)    || 0,
  };
};

const getPhleboList = async (branch, search = "") => {
  const term = `%${search}%`;
  const [rows] = await db.execute(
    `SELECT
       pp.id AS profileId,
       u.id AS userId,
       u.name,
       u.email,
       u.phone,
       pp.phlebo_type,
       pp.available_days,
       pp.morning_start,
       pp.morning_end,
       pp.evening_start,
       pp.evening_end,
       pp.qualification,
       pp.certification_number,
       pp.created_at,
       pp.updated_at AS lastUpdated,
       (SELECT COUNT(*) FROM home_service_bookings WHERE assigned_phlebo_id = u.id) AS assignedCount,
       (SELECT COUNT(*) FROM home_service_bookings WHERE assigned_phlebo_id = u.id AND status = 'completed') AS completedCount
     FROM phlebo_profiles pp
     JOIN users u ON u.id = pp.user_id
     WHERE (? = '' OR u.name LIKE ? OR u.email LIKE ? OR u.phone LIKE ?)`,
    [search, term, term, term]
  );
  return rows;
};

const getTodayPhleboBookings = async (branch) => {
  const normalizedBranch = branch === "Akkayyapalem" ? "Akkayapalem" : branch;
  const [rows] = await db.execute(
    `SELECT
       assigned_phlebo_id AS phleboId,
       time_slot AS timeSlot
     FROM home_service_bookings
     WHERE collection_date = CURDATE()
       AND assigned_phlebo_id IS NOT NULL
       AND branch = ?`,
    [normalizedBranch]
  );
  return rows;
};

const getHomeServiceBooking = async (bookingId) => {
  const [rows] = await db.execute(
    `SELECT * FROM home_service_bookings WHERE id = ? OR public_booking_id = ? LIMIT 1`,
    [bookingId, bookingId]
  );
  return rows[0] || null;
};

const updateHomeServiceBookingStatus = async (id, status) => {
  const [result] = await db.execute(
    `UPDATE home_service_bookings SET status = ?, updated_at = NOW() WHERE id = ?`,
    [status, id]
  );
  return result.affectedRows > 0;
};

const getActiveBookingsForPhlebos = async () => {
  const [rows] = await db.execute(
    `SELECT
       id,
       public_booking_id AS publicBookingId,
       assigned_phlebo_id AS phleboId,
       patient_name AS patientName,
       patient_mobile AS patientMobile,
       patient_address AS patientAddress,
       status,
       collection_date AS collectionDate,
       time_slot AS timeSlot,
       updated_at AS updatedAt
     FROM home_service_bookings
     WHERE assigned_phlebo_id IS NOT NULL
       AND status IN ('assigned', 'accepted', 'sample_collected', 'submitted_to_lab', 'received_by_lab', 'report_ready')`
  );
  return rows;
};

module.exports = {
  getSupervisorBranch,
  getDashboardSummary,
  getStaffList,
  updateStaffApprovalStatus,
  verifyStaffBelongsToBranch,
  getPatientsAndAppointments,
  getOrganizationProfile,
  updateOrganizationProfile,
  getReportCounts,
  getPhleboList,
  getTodayPhleboBookings,
  getHomeServiceBooking,
  updateHomeServiceBookingStatus,
  getActiveBookingsForPhlebos,
};
