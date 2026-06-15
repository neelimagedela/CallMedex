const db = require("../../config/db");

const makePlaceholders = (items) => items.map(() => "?").join(", ");

const getSafeVariants = (branch, branchVariants = []) => {
  const list =
    Array.isArray(branchVariants) && branchVariants.length > 0
      ? branchVariants
      : [String(branch || "").toLowerCase().trim()];

  return list.filter(Boolean);
};

const getSupervisorBranch = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT
      u.branch,
      op.institution_name
    FROM users u
    LEFT JOIN organization_profiles op ON op.user_id = u.id
    WHERE u.id = ?
    LIMIT 1
    `,
    [userId]
  );

  const row = rows[0];

  if (!row) return null;

  return row.branch || row.institution_name || null;
};

const getDashboardSummary = async (branch, branchVariants = []) => {
  const variants = getSafeVariants(branch, branchVariants);
  const placeholders = makePlaceholders(variants);

  const [[staffRow]] = await db.execute(
    `
    SELECT
      COUNT(*) AS totalStaff,
      SUM(approval_status = 'pending') AS pendingStaff,
      SUM(approval_status = 'approved') AS approvedStaff
    FROM staff_profiles
    WHERE LOWER(TRIM(organization_name)) IN (${placeholders})
    `,
    variants
  );

  const [[homeRow]] = await db.execute(
    `
    SELECT COUNT(*) AS cnt
    FROM home_service_bookings
    WHERE LOWER(TRIM(branch)) IN (${placeholders})
    `,
    variants
  );

  const [[scanRow]] = await db.execute(
    `
    SELECT COUNT(*) AS cnt
    FROM appointments
    WHERE LOWER(TRIM(branch)) IN (${placeholders})
    `,
    variants
  );

  const [[walkinRow]] = await db.execute(
    `
    SELECT COUNT(*) AS cnt
    FROM diagnostic_walkin_bookings
    WHERE LOWER(TRIM(branch)) IN (${placeholders})
    `,
    variants
  );

  const [[patientRow]] = await db.execute(
    `
    SELECT COUNT(DISTINCT patient_email) AS totalPatients
    FROM (
      SELECT patient_email, branch FROM home_service_bookings
      UNION ALL
      SELECT patient_email, branch FROM appointments
      UNION ALL
      SELECT patient_email, branch FROM diagnostic_walkin_bookings
    ) x
    WHERE LOWER(TRIM(branch)) IN (${placeholders})
    `,
    variants
  );

  const [phleboRows] = await db.execute(
    `
    SELECT
      phlebo_type,
      available_days,
      morning_start,
      morning_end,
      evening_start,
      evening_end
    FROM phlebo_profiles
    `
  );

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  let activePhlebos = 0;

  for (const p of phleboRows) {
    if (p.phlebo_type === "fullTime") {
      activePhlebos++;
      continue;
    }

    let days = [];

    try {
      days =
        typeof p.available_days === "string"
          ? JSON.parse(p.available_days)
          : p.available_days;
    } catch {
      days = [];
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
    totalAppointments:
      Number(homeRow.cnt || 0) +
      Number(scanRow.cnt || 0) +
      Number(walkinRow.cnt || 0),
    totalPhlebos: phleboRows.length,
    activePhlebos,
  };
};

const getStaffList = async (branch, branchVariants = [], search = "") => {
  const variants = getSafeVariants(branch, branchVariants);
  const placeholders = makePlaceholders(variants);
  const term = `%${search}%`;

  const [rows] = await db.execute(
    `
    SELECT
      sp.id,
      sp.user_id AS userId,
      u.name,
      u.email,
      u.phone,
      u.branch,
      sp.organization_name AS organizationName,
      sp.staff_role AS role,
      sp.department,
      sp.experience,
      sp.alternate_phone AS alternatePhone,
      sp.approval_status,
      sp.created_at,
      sp.updated_at,
      COALESCE(sp.updated_at, sp.created_at, u.updated_at) AS lastActivity
    FROM staff_profiles sp
    JOIN users u ON u.id = sp.user_id
    WHERE LOWER(TRIM(sp.organization_name)) IN (${placeholders})
      AND (
        ? = ''
        OR u.name LIKE ?
        OR u.email LIKE ?
        OR u.phone LIKE ?
        OR sp.staff_role LIKE ?
        OR sp.department LIKE ?
      )
    ORDER BY lastActivity DESC
    `,
    [...variants, search, term, term, term, term, term]
  );

  return rows;
};

const updateStaffApprovalStatus = async (staffProfileId, status) => {
  const allowed = ["approved", "rejected", "pending"];

  if (!allowed.includes(status)) {
    throw new Error("Invalid approval status value");
  }

  const [result] = await db.execute(
    `
    UPDATE staff_profiles
    SET approval_status = ?, updated_at = NOW()
    WHERE id = ?
    `,
    [status, staffProfileId]
  );

  return result.affectedRows;
};

const verifyStaffBelongsToBranch = async (
  staffProfileId,
  branchVariants = []
) => {
  const variants = getSafeVariants("", branchVariants);
  const placeholders = makePlaceholders(variants);

  const [rows] = await db.execute(
    `
    SELECT id
    FROM staff_profiles
    WHERE id = ?
      AND LOWER(TRIM(organization_name)) IN (${placeholders})
    LIMIT 1
    `,
    [staffProfileId, ...variants]
  );

  return rows.length > 0;
};

const getPatientsAndAppointments = async (
  branch,
  branchVariants = [],
  search = ""
) => {
  const variants = getSafeVariants(branch, branchVariants);
  const placeholders = makePlaceholders(variants);
  const term = `%${search}%`;

  const searchParams = [search, term, term, term, term, term];

  const homeQuery = `
    SELECT
      id,
      user_id AS userId,
      assigned_phlebo_id AS assignedPhleboId,
      patient_name AS patientName,
      patient_age AS patientAge,
      patient_sex AS patientSex,
      patient_mobile AS patientMobile,
      patient_email AS patientEmail,
      patient_address AS patientAddress,
      branch,
      'home_service' AS bookingType,
      public_booking_id AS bookingId,
      collection_date AS date,
      time_slot AS timeSlot,
      prescription_path AS prescriptionPath,
      total_amount AS totalAmount,
      status,
      tests AS service,
      phlebo_notes AS phleboNotes,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM home_service_bookings
    WHERE LOWER(TRIM(branch)) IN (${placeholders})
      AND (
        ? = ''
        OR patient_name LIKE ?
        OR patient_email LIKE ?
        OR patient_mobile LIKE ?
        OR public_booking_id LIKE ?
        OR status LIKE ?
      )
  `;

  const scanQuery = `
    SELECT
      id,
      user_id AS userId,
      NULL AS assignedPhleboId,
      patient_name AS patientName,
      patient_age AS patientAge,
      patient_sex AS patientSex,
      patient_mobile AS patientMobile,
      patient_email AS patientEmail,
      patient_address AS patientAddress,
      branch,
      'scan_appointment' AS bookingType,
      receipt_id AS bookingId,
      appointment_date AS date,
      time_slot AS timeSlot,
      prescription_path AS prescriptionPath,
      total_amount AS totalAmount,
      status,
      scans AS service,
      NULL AS phleboNotes,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM appointments
    WHERE LOWER(TRIM(branch)) IN (${placeholders})
      AND (
        ? = ''
        OR patient_name LIKE ?
        OR patient_email LIKE ?
        OR patient_mobile LIKE ?
        OR receipt_id LIKE ?
        OR status LIKE ?
      )
  `;

  const walkinQuery = `
    SELECT
      id,
      user_id AS userId,
      NULL AS assignedPhleboId,
      patient_name AS patientName,
      patient_age AS patientAge,
      patient_sex AS patientSex,
      patient_mobile AS patientMobile,
      patient_email AS patientEmail,
      patient_address AS patientAddress,
      branch,
      'diagnostic_walkin' AS bookingType,
      receipt_id AS bookingId,
      walkin_date AS date,
      time_slot AS timeSlot,
      NULL AS prescriptionPath,
      total_amount AS totalAmount,
      status,
      tests AS service,
      NULL AS phleboNotes,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM diagnostic_walkin_bookings
    WHERE LOWER(TRIM(branch)) IN (${placeholders})
      AND (
        ? = ''
        OR patient_name LIKE ?
        OR patient_email LIKE ?
        OR patient_mobile LIKE ?
        OR receipt_id LIKE ?
        OR status LIKE ?
      )
  `;

  const [homeRows, scanRows, walkinRows] = await Promise.all([
    db.execute(homeQuery, [...variants, ...searchParams]),
    db.execute(scanQuery, [...variants, ...searchParams]),
    db.execute(walkinQuery, [...variants, ...searchParams]),
  ]);

  const all = [...homeRows[0], ...scanRows[0], ...walkinRows[0]];

  return all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const getOrganizationProfile = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT
      op.institution_name,
      op.license_number,
      op.head_of_institution,
      op.alt_phone,
      op.emergency_phone,
      u.branch
    FROM organization_profiles op
    JOIN users u ON u.id = op.user_id
    WHERE op.user_id = ?
    LIMIT 1
    `,
    [userId]
  );

  return rows[0] || null;
};

const updateOrganizationProfile = async (userId, fields) => {
  const { institutionName, licenseNumber, headOfInstitution } = fields;

  const [result] = await db.execute(
    `
    UPDATE organization_profiles
    SET
      institution_name = COALESCE(?, institution_name),
      license_number = COALESCE(?, license_number),
      head_of_institution = COALESCE(?, head_of_institution),
      updated_at = NOW()
    WHERE user_id = ?
    `,
    [
      institutionName || null,
      licenseNumber || null,
      headOfInstitution || null,
      userId,
    ]
  );

  return result.affectedRows;
};

const getReportCounts = async (branch, branchVariants = []) => {
  const variants = getSafeVariants(branch, branchVariants);
  const placeholders = makePlaceholders(variants);

  const [[staffRow]] = await db.execute(
    `
    SELECT COUNT(*) AS cnt
    FROM staff_profiles
    WHERE LOWER(TRIM(organization_name)) IN (${placeholders})
    `,
    variants
  );

  const [[homeRow]] = await db.execute(
    `
    SELECT COUNT(*) AS cnt
    FROM home_service_bookings
    WHERE LOWER(TRIM(branch)) IN (${placeholders})
    `,
    variants
  );

  const [[scanRow]] = await db.execute(
    `
    SELECT COUNT(*) AS cnt
    FROM appointments
    WHERE LOWER(TRIM(branch)) IN (${placeholders})
    `,
    variants
  );

  const [[walkinRow]] = await db.execute(
    `
    SELECT COUNT(*) AS cnt
    FROM diagnostic_walkin_bookings
    WHERE LOWER(TRIM(branch)) IN (${placeholders})
    `,
    variants
  );

  const [[patientRow]] = await db.execute(
    `
    SELECT COUNT(DISTINCT patient_email) AS cnt
    FROM (
      SELECT patient_email, branch FROM home_service_bookings
      UNION ALL
      SELECT patient_email, branch FROM appointments
      UNION ALL
      SELECT patient_email, branch FROM diagnostic_walkin_bookings
    ) x
    WHERE LOWER(TRIM(branch)) IN (${placeholders})
    `,
    variants
  );

  return {
    staffCount: Number(staffRow.cnt) || 0,
    appointmentCount:
      Number(homeRow.cnt || 0) +
      Number(scanRow.cnt || 0) +
      Number(walkinRow.cnt || 0),
    patientCount: Number(patientRow.cnt) || 0,
    homeServiceCount: Number(homeRow.cnt) || 0,
    scanCount: Number(scanRow.cnt) || 0,
    walkinCount: Number(walkinRow.cnt) || 0,
  };
};

const getPhleboList = async (branch, branchVariants = [], search = "") => {
  const term = `%${search}%`;

  const [rows] = await db.execute(
    `
    SELECT
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
      (
        SELECT COUNT(*)
        FROM home_service_bookings
        WHERE assigned_phlebo_id = u.id
      ) AS assignedCount,
      (
        SELECT COUNT(*)
        FROM home_service_bookings
        WHERE assigned_phlebo_id = u.id
          AND status = 'completed'
      ) AS completedCount
    FROM phlebo_profiles pp
    JOIN users u ON u.id = pp.user_id
    WHERE (
      ? = ''
      OR u.name LIKE ?
      OR u.email LIKE ?
      OR u.phone LIKE ?
    )
    ORDER BY pp.updated_at DESC
    `,
    [search, term, term, term]
  );

  return rows;
};

const getHomeServiceBooking = async (bookingId, branchVariants = []) => {
  const variants = getSafeVariants("", branchVariants);

  let sql = `
    SELECT *
    FROM home_service_bookings
    WHERE (id = ? OR public_booking_id = ?)
  `;

  const params = [bookingId, bookingId];

  if (variants.length > 0) {
    const placeholders = makePlaceholders(variants);
    sql += ` AND LOWER(TRIM(branch)) IN (${placeholders})`;
    params.push(...variants);
  }

  sql += ` LIMIT 1`;

  const [rows] = await db.execute(sql, params);

  return rows[0] || null;
};

const updateHomeServiceBookingStatus = async (
  id,
  status,
  branchVariants = []
) => {
  const variants = getSafeVariants("", branchVariants);

  let sql = `
    UPDATE home_service_bookings
    SET status = ?, updated_at = NOW()
    WHERE id = ?
  `;

  const params = [status, id];

  if (variants.length > 0) {
    const placeholders = makePlaceholders(variants);
    sql += ` AND LOWER(TRIM(branch)) IN (${placeholders})`;
    params.push(...variants);
  }

  const [result] = await db.execute(sql, params);

  return result.affectedRows > 0;
};

const getActiveBookingsForPhlebos = async (branchVariants = []) => {
  const variants = getSafeVariants("", branchVariants);

  let sql = `
    SELECT
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
      AND status IN (
        'assigned',
        'accepted',
        'sample_collected',
        'submitted_to_lab',
        'received_by_lab',
        'processing',
        'report_ready'
      )
  `;

  const params = [];

  if (variants.length > 0) {
    const placeholders = makePlaceholders(variants);
    sql += ` AND LOWER(TRIM(branch)) IN (${placeholders})`;
    params.push(...variants);
  }

  sql += ` ORDER BY updated_at DESC`;

  const [rows] = await db.execute(sql, params);

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
  getHomeServiceBooking,
  updateHomeServiceBookingStatus,
  getActiveBookingsForPhlebos,
};