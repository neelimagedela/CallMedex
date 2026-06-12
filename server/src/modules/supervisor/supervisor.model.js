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
const getStaffList = async (branch) => {
  const [rows] = await db.execute(
    `SELECT
       sp.id,
       u.name,
       u.email,
       sp.staff_role AS role,
       sp.department,
       sp.approval_status,
       sp.created_at
     FROM staff_profiles sp
     JOIN users u ON u.id = sp.user_id
     WHERE sp.organization_name = ?
     ORDER BY sp.created_at DESC`,
    [branch]
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
const getPatientsAndAppointments = async (branch) => {
  if (branch === "Akkayyapalem") {
    branch = "Akkayapalem";
  }

  console.log("SUPERVISOR BRANCH:", branch);

  const [apptRows] = await db.execute(
    `SELECT
       patient_name AS patientName,
       scans AS service,
       appointment_date AS date,
       status,
       'scan_appointment' AS type,
       receipt_id AS receiptId
     FROM appointments
     WHERE branch = ?`,
    [branch]
  );

  console.log("APPOINTMENT ROWS:", apptRows);

  const [homeRows] = await db.execute(
    `SELECT
       patient_name AS patientName,
       tests AS service,
       collection_date AS date,
       status,
       'home_service' AS type,
       public_booking_id AS receiptId
     FROM home_service_bookings
     WHERE branch = ?
     ORDER BY collection_date DESC`,
    [branch]
  );

  console.log("HOME ROWS:", homeRows);

const [walkinRows] = await db.execute(
  `SELECT
     patient_name AS patientName,
     tests AS service,
     walkin_date AS date,
     status,
     'walkin_center' AS type,
     receipt_id AS receiptId
   FROM diagnostic_walkin_bookings
   WHERE branch = ?`,
  [branch]
);

console.log("WALKIN ROWS:", walkinRows);

const all = [
  ...apptRows,
  ...homeRows,
  ...walkinRows
].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

  console.log("FINAL DATA:", all);

  return all;
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
};
