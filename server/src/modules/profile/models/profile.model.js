const db = require("../../../config/db");

const getTableName = (role) => {
  switch (role) {
    case "patient":
      return "patient_profiles";
    case "doctor":
      return "doctor_profiles";
    case "phlebo":
    case "phlebotomist":
      return "phlebo_profiles";
    case "pharmacy":
      return "pharmacy_profiles";
    case "organization":
      return "organization_profiles";
    case "admin":
      return "admin_profiles";
    default:
      throw new Error(`Invalid role for onboarding: ${role}`);
  }
};

const mapCamelToSnake = (data, role) => {
  const mapped = {};
  
  // Custom manual mappings for edge cases
  const mappings = {
    // Patient
    bloodGroup: "blood_group",
    medicalHistory: "medical_history",
    otherCondition: "other_condition",
    
    // Doctor
    medicalLicenseNumber: "medical_license_number",
    hospitalOrClinicName: "hospital_clinic_name",
    consultationFee: "consultation_fee",
    availableTimings: "available_timings",
    consultationMode: "consultation_mode",
    availableForOnlineConsultation: "available_online",
    languagesKnown: "languages_known",
    medicalCertificate: "medical_certificate",
    medicalLicense: "medical_license",
    idProof: "id_proof",
    
    // Phlebotomist
    phleboType: "phlebo_type",
    certificationNumber: "certification_number",
    availableDays: "available_days",
    availableTime: "available_time",
    homeCollection: "home_collection",
    emergencyAvailability: "emergency_availability",
    governmentIdType: "government_id_type",
    aadhaarFront: "aadhaar_front",
    phlebotomyCertificate: "phlebotomy_certificate",
    
    // Pharmacy
    pharmacyName: "pharmacy_name",
    pharmacyType: "pharmacy_type",
    ownerName: "owner_name",
    pharmacistInCharge: "pharmacist_in_charge",
    yearsOfOperation: "years_of_operation",
    operatingHours: "operating_hours",
    registrationNumber: "registration_number",
    drugLicenseNumber: "drug_license_number",
    gstNumber: "gst_number",
    homeDeliveryAvailable: "home_delivery",
    emergencyServiceAvailable: "emergency_service",
    onlineConsultationSupport: "online_consultation",
    availability24x7: "availability_24x7",
    drugLicenseDocument: "drug_license_document",
    gstCertificate: "gst_certificate",
    pharmacistCertificate: "pharmacist_certificate",
    pharmacyImages: "pharmacy_images",
    ownerIdProof: "owner_id_proof",
    
    // Organization
    institutionName: "institution_name",
    institutionType: "institution_type",
    licenseNumber: "license_number",
    establishmentYear: "establishment_year",
    ownershipType: "ownership_type",
    altPhone: "alt_phone",
    emergencyPhone: "emergency_phone",
    headOfInstitution: "head_of_institution",
    totalDepartments: "total_departments",
    totalStaff: "total_staff",
    totalBranches: "total_branches",
    registrationCertificate: "registration_certificate",
    governmentLicense: "government_license",
    authorizedPersonIdProof: "authorized_person_id_proof",
    
    // Admin
    accessLevel: "access_level",
    officeLocation: "office_location",
    joiningDate: "joining_date",
    officialEmail: "official_email",
    alternatePhone: "alternate_phone",
    securityQuestion: "security_question",
    securityAnswer: "security_answer",
    twoFAEnabled: "two_fa_enabled",
    aadhaarUpload: "aadhaar_upload",
    governmentIdProof: "government_id_proof"
  };

  for (const key in data) {
    if (data[key] === undefined) continue;
    
    const dbKey = mappings[key] || key.replace(/([A-Z])/g, "_$1").toLowerCase();
    let val = data[key];

    // Format fields appropriately
    if (["medical_history", "languages_known", "available_days", "permissions"].includes(dbKey)) {
      val = Array.isArray(val) ? JSON.stringify(val) : val;
    } else if (typeof val === "boolean") {
      val = val ? 1 : 0;
    } else if (val === "") {
      val = null;
    }
    
    mapped[dbKey] = val;
  }
  
  return mapped;
};

const upsertProfile = async (userId, role, profileData) => {
  const tableName = getTableName(role);
  const data = mapCamelToSnake(profileData, role);
  data.user_id = userId;

  const keys = Object.keys(data);
  const values = Object.values(data);
  
  const placeholders = keys.map(() => "?").join(", ");
  const updates = keys.map((key) => `${key} = VALUES(${key})`).join(", ");

  const query = `
    INSERT INTO ${tableName} (${keys.join(", ")})
    VALUES (${placeholders})
    ON DUPLICATE KEY UPDATE ${updates}
  `;

  const [result] = await db.execute(query, values);

  // Update users registration status to PROFILE_COMPLETED
  await db.execute(
    `UPDATE users SET registration_status = 'PROFILE_COMPLETED' WHERE id = ?`,
    [userId]
  );

  return result;
};

const findProfileByUserId = async (userId, role) => {
  const tableName = getTableName(role);
  const [rows] = await db.execute(
    `SELECT * FROM ${tableName} WHERE user_id = ? LIMIT 1`,
    [userId]
  );
  return rows[0];
};
const getPatientFullProfileByUserId = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT
      u.id,
      u.public_user_id,
      u.name,
      u.email,
      u.phone,
      u.role,
      u.gender,
      u.dob,
      u.address,
      u.city,
      u.district,
      u.state,
      u.pincode,
      u.country,
      u.registration_status,

      pp.blood_group,
      pp.height,
      pp.weight,
      pp.medical_history,
      pp.has_other_condition,
      pp.other_condition
    FROM users u
    LEFT JOIN patient_profiles pp
      ON pp.user_id = u.id
    WHERE u.id = ?
      AND u.role = 'patient'
    LIMIT 1
    `,
    [userId]
  );

  return rows[0];
};

const updatePatientFullProfileByUserId = async (userId, data) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute(
      `
      UPDATE users
      SET
        name = ?,
        phone = ?,
        email = ?,
        gender = ?,
        dob = ?,
        address = ?,
        city = ?,
        district = ?,
        state = ?,
        pincode = ?,
        country = ?
      WHERE id = ?
        AND role = 'patient'
      `,
      [
        data.name,
        data.phone,
        data.email,
        data.gender || null,
        data.dob || null,
        data.address || null,
        data.city || null,
        data.district || null,
        data.state || null,
        data.pincode || null,
        data.country || "India",
        userId,
      ]
    );

    const medicalHistoryJson = Array.isArray(data.medicalHistory)
      ? JSON.stringify(data.medicalHistory)
      : JSON.stringify([]);

    await connection.execute(
      `
      INSERT INTO patient_profiles (
        user_id,
        blood_group,
        height,
        weight,
        medical_history,
        has_other_condition,
        other_condition
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        blood_group = VALUES(blood_group),
        height = VALUES(height),
        weight = VALUES(weight),
        medical_history = VALUES(medical_history),
        has_other_condition = VALUES(has_other_condition),
        other_condition = VALUES(other_condition)
      `,
      [
        userId,
        data.bloodGroup || null,
        data.height || null,
        data.weight || null,
        medicalHistoryJson,
        data.hasOtherCondition ? 1 : 0,
        data.otherCondition || null,
      ]
    );

    await connection.commit();

    return getPatientFullProfileByUserId(userId);
  } catch (error) {
    await connection.rollback();

    if (error.code === "ER_DUP_ENTRY") {
      error.status = 409;
      error.message = "Email or phone number already exists";
    }

    throw error;
  } finally {
    connection.release();
  }
};
const findPatientBookingsByUserId = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT
      id,
      receipt_id,
      patient_name,
      patient_age,
      patient_sex,
      patient_mobile,
      patient_email,
      patient_address,
      branch,
      scans,
      appointment_date,
      time_slot,
      prescription_path,
      total_amount,
      status,
      created_at
    FROM appointments
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return rows;
};

const findPatientConsultationBookingsByUserId = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM consultancy_home_bookings
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return rows;
};

module.exports = {
  upsertProfile,
  findProfileByUserId,
  getPatientFullProfileByUserId,
  updatePatientFullProfileByUserId,
  findPatientBookingsByUserId,
  findPatientConsultationBookingsByUserId,
};