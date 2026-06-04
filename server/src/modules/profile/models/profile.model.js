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

const mapCamelToSnake = (data) => {
  const mappings = {
    // Patient
    bloodGroup: "blood_group",
    medicalHistory: "medical_history",
    hasOtherCondition: "has_other_condition",
    otherCondition: "other_condition",

    // Doctor
    medicalLicenseNumber: "medical_license_number",
    yearsOfExperience: "years_of_experience",
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
    qualification: "qualification",
    specialization: "specialization",
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
    status: "status",
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
    permissions: "permissions",
    aadhaarUpload: "aadhaar_upload",
    governmentIdProof: "government_id_proof",
  };

  const mapped = {};

  Object.entries(data).forEach(([key, value]) => {
    if (
      key === "userId" ||
      key === "role" ||
      key === "name" ||
      key === "email" ||
      key === "phone" ||
      key === "gender" ||
      key === "dob" ||
      key === "address" ||
      key === "city" ||
      key === "district" ||
      key === "state" ||
      key === "pincode" ||
      key === "country" ||

      // Ignored because these columns do not exist in phlebo_profiles table
      key === "morningStart" ||
      key === "morningEnd" ||
      key === "eveningStart" ||
      key === "eveningEnd"
    ) {
      return;
    }

    const dbKey = mappings[key] || key;

    if (Array.isArray(value)) {
      mapped[dbKey] = JSON.stringify(value);
    } else if (value && typeof value === "object") {
      mapped[dbKey] = JSON.stringify(value);
    } else if (typeof value === "boolean") {
      mapped[dbKey] = value ? 1 : 0;
    } else {
      mapped[dbKey] = value ?? null;
    }
  });

  return mapped;
};

const upsertProfile = async ({ userId, role, ...profileData }) => {
  const tableName = getTableName(role);
  const mappedData = mapCamelToSnake(profileData);

  if (Object.keys(mappedData).length === 0) {
    await db.execute(
      `
      UPDATE users
      SET registration_status = 'PROFILE_COMPLETED'
      WHERE id = ?
      `,
      [userId]
    );

    return {
      userId,
      role,
    };
  }

  const columns = ["user_id", ...Object.keys(mappedData)];
  const values = [userId, ...Object.values(mappedData)];

  const placeholders = columns.map(() => "?").join(", ");

  const updates = Object.keys(mappedData)
    .map((column) => `${column} = VALUES(${column})`)
    .join(", ");

  await db.execute(
    `
    INSERT INTO ${tableName} (${columns.join(", ")})
    VALUES (${placeholders})
    ON DUPLICATE KEY UPDATE
      ${updates}
    `,
    values
  );

  await db.execute(
    `
    UPDATE users
    SET registration_status = 'PROFILE_COMPLETED'
    WHERE id = ?
    `,
    [userId]
  );

  return {
    userId,
    role,
    ...profileData,
  };
};

const findProfileByUserId = async (userId, role) => {
  const tableName = getTableName(role);

  const [rows] = await db.execute(
    `
    SELECT *
    FROM ${tableName}
    WHERE user_id = ?
    LIMIT 1
    `,
    [userId]
  );

  return rows[0] || null;
};

const parseJsonArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
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

  const row = rows[0];

  if (!row) return null;

  return {
    id: row.public_user_id || row.id,
    internalId: row.id,
    publicUserId: row.public_user_id,
    name: row.name || "",
    email: row.email || "",
    phone: row.phone || "",
    gender: row.gender || "",
    dob: row.dob ? String(row.dob).slice(0, 10) : "",
    address: row.address || "",
    city: row.city || "",
    district: row.district || "",
    state: row.state || "",
    pincode: row.pincode || "",
    country: row.country || "India",
    registrationStatus: row.registration_status || "VERIFIED",

    bloodGroup: row.blood_group || "",
    height: row.height || "",
    weight: row.weight || "",
    medicalHistory: parseJsonArray(row.medical_history),
    hasOtherCondition: Boolean(row.has_other_condition),
    otherCondition: row.other_condition || "",
  };
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
        JSON.stringify(
          Array.isArray(data.medicalHistory) ? data.medicalHistory : []
        ),
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

const safeJsonArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const money = (value) => {
  return Number(value || 0);
};

const getAllPatientBookingsByUserId = async (userId) => {
  const [scanRows] = await db.execute(
    `
    SELECT
      id,
      receipt_id,
      patient_name,
      patient_mobile,
      patient_email,
      patient_address,
      branch,
      scans,
      appointment_date,
      time_slot,
      total_amount,
      status,
      created_at
    FROM appointments
    WHERE user_id = ?
    `,
    [userId]
  );

  const [homeServiceRows] = await db.execute(
    `
    SELECT
      id,
      public_booking_id AS receipt_id,
      patient_name,
      patient_mobile,
      patient_email,
      patient_address,
      branch,
      tests,
      collection_date AS appointment_date,
      time_slot,
      total_amount,
      status,
      created_at
    FROM home_service_bookings
    WHERE user_id = ?
    `,
    [userId]
  );

  const [walkInCenterRows] = await db.execute(
    `
    SELECT
      id,
      receipt_id,
      patient_name,
      patient_mobile,
      patient_email,
      patient_address,
      branch,
      tests,
      walkin_date AS appointment_date,
      time_slot,
      total_amount,
      status,
      created_at
    FROM diagnostic_walkin_bookings
    WHERE user_id = ?
    `,
    [userId]
  );

  const [clinicRows] = await db.execute(
    `
    SELECT
      id,
      receipt_id,
      patient_name,
      patient_mobile,
      patient_email,
      patient_address,
      clinic_branch AS branch,
      appointment_date,
      time_slot,
      consultation_fee AS total_amount,
      status,
      created_at
    FROM clinic_appointments
    WHERE user_id = ?
    `,
    [userId]
  );

  const [consultationHomeRows] = await db.execute(
    `
    SELECT
      b.id,
      b.receipt_id,
      b.patient_name,
      b.patient_phone AS patient_mobile,
      b.patient_email,
      b.patient_address,
      b.appointment_date,
      b.time_slot,
      b.total_amount,
      b.booking_status AS status,
      b.created_at,

      i.service_name,
      i.price,
      i.quantity,
      i.line_total
    FROM consultancy_home_bookings b
    LEFT JOIN consultancy_home_booking_items i
      ON i.booking_id = b.id
    WHERE b.user_id = ?
    ORDER BY b.created_at DESC
    `,
    [userId]
  );

  const [teleRows] = await db.execute(
    `
    SELECT
      id,
      receipt_id,
      patient_name,
      patient_mobile,
      patient_email,
      patient_address,
      specialization,
      appointment_date,
      time_slot,
      consultation_fee AS total_amount,
      COALESCE(status, 'pending') AS status,
      created_at
    FROM tele_consultation_bookings
    WHERE user_id = ?
    `,
    [userId]
  );

  const [pharmacyRows] = await db.execute(
    `
    SELECT
      o.id,
      o.public_order_id AS receipt_id,
      o.patient_name,
      o.patient_phone AS patient_mobile,
      o.patient_email,
      o.delivery_address AS patient_address,
      o.order_mode,
      o.total_amount,
      o.status,
      o.created_at,

      oi.medicine_name,
      oi.quantity,
      oi.unit_price,
      oi.total_price
    FROM pharmacy_orders o
    LEFT JOIN pharmacy_order_items oi
      ON oi.order_id = o.id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
    `,
    [userId]
  );

  const consultationHomeMap = new Map();

  consultationHomeRows.forEach((row) => {
    if (!consultationHomeMap.has(row.id)) {
      consultationHomeMap.set(row.id, {
        id: `consultation-home-${row.id}`,
        receiptId: row.receipt_id,
        bookingType: "consultation-home",
        typeLabel: "Consultation at Home",
        date: row.appointment_date,
        timeSlot: row.time_slot,
        patientName: row.patient_name,
        patientMobile: row.patient_mobile,
        patientEmail: row.patient_email,
        locationLabel: "Visit Address",
        locationValue: row.patient_address,
        totalAmount: money(row.total_amount),
        status: row.status || "pending",
        detailTitle: "Selected Services",
        items: [],
        createdAt: row.created_at,
      });
    }

    if (row.service_name) {
      consultationHomeMap.get(row.id).items.push({
        name: row.service_name,
        quantity: row.quantity,
        price: money(row.line_total || row.price),
      });
    }
  });

  const pharmacyMap = new Map();

  pharmacyRows.forEach((row) => {
    if (!pharmacyMap.has(row.id)) {
      pharmacyMap.set(row.id, {
        id: `pharmacy-${row.id}`,
        receiptId: row.receipt_id,
        bookingType: "pharmacy",
        typeLabel: "Pharmacy Order",
        date: row.created_at,
        timeSlot: "",
        patientName: row.patient_name,
        patientMobile: row.patient_mobile,
        patientEmail: row.patient_email,
        locationLabel:
          row.order_mode === "online" ? "Delivery Address" : "Pickup",
        locationValue: row.patient_address,
        totalAmount: money(row.total_amount),
        status: row.status || "pending",
        detailTitle: "Medicines",
        items: [],
        createdAt: row.created_at,
      });
    }

    if (row.medicine_name) {
      pharmacyMap.get(row.id).items.push({
        name: row.medicine_name,
        quantity: row.quantity,
        price: money(row.total_price || row.unit_price),
      });
    }
  });

  const bookings = [
    ...scanRows.map((row) => ({
      id: `scan-${row.id}`,
      receiptId: row.receipt_id,
      bookingType: "scan",
      typeLabel: "Scan Appointment",
      date: row.appointment_date,
      timeSlot: row.time_slot,
      patientName: row.patient_name,
      patientMobile: row.patient_mobile,
      patientEmail: row.patient_email,
      locationLabel: "Branch",
      locationValue: row.branch,
      totalAmount: money(row.total_amount),
      status: row.status || "pending",
      detailTitle: "Selected Scans",
      items: safeJsonArray(row.scans).map((item) => ({
        name: item.name || item.test_name || "Scan",
        price: money(item.price),
      })),
      createdAt: row.created_at,
    })),

    ...homeServiceRows.map((row) => ({
      id: `home-service-${row.id}`,
      receiptId: row.receipt_id,
      bookingType: "home-service",
      typeLabel: "Home Service Test",
      date: row.appointment_date,
      timeSlot: row.time_slot,
      patientName: row.patient_name,
      patientMobile: row.patient_mobile,
      patientEmail: row.patient_email,
      locationLabel: "Collection Address",
      locationValue: row.patient_address,
      totalAmount: money(row.total_amount),
      status: row.status || "pending",
      detailTitle: "Selected Tests",
      items: safeJsonArray(row.tests).map((item) => ({
        name: item.name || item.test_name || "Test",
        price: money(item.price),
      })),
      createdAt: row.created_at,
    })),

    ...walkInCenterRows.map((row) => ({
      id: `walkin-center-${row.id}`,
      receiptId: row.receipt_id,
      bookingType: "walkin-center",
      typeLabel: "Walk-in Center Test",
      date: row.appointment_date,
      timeSlot: row.time_slot,
      patientName: row.patient_name,
      patientMobile: row.patient_mobile,
      patientEmail: row.patient_email,
      locationLabel: "Branch",
      locationValue: row.branch,
      totalAmount: money(row.total_amount),
      status: row.status || "pending",
      detailTitle: "Selected Tests",
      items: safeJsonArray(row.tests).map((item) => ({
        name: item.name || item.test_name || "Test",
        price: money(item.price),
      })),
      createdAt: row.created_at,
    })),

    ...clinicRows.map((row) => ({
      id: `clinic-${row.id}`,
      receiptId: row.receipt_id,
      bookingType: "walkin-clinic",
      typeLabel: "Walk-in Clinic Appointment",
      date: row.appointment_date,
      timeSlot: row.time_slot,
      patientName: row.patient_name,
      patientMobile: row.patient_mobile,
      patientEmail: row.patient_email,
      locationLabel: "Clinic Branch",
      locationValue: row.branch,
      totalAmount: money(row.total_amount),
      status: row.status || "pending",
      detailTitle: "Appointment Details",
      items: [
        {
          name: "Doctor consultation at clinic",
          price: money(row.total_amount),
        },
      ],
      createdAt: row.created_at,
    })),

    ...Array.from(consultationHomeMap.values()),

    ...teleRows.map((row) => ({
      id: `tele-${row.id}`,
      receiptId: row.receipt_id,
      bookingType: "tele-consultation",
      typeLabel: "Tele Consultation",
      date: row.appointment_date,
      timeSlot: row.time_slot,
      patientName: row.patient_name,
      patientMobile: row.patient_mobile,
      patientEmail: row.patient_email,
      locationLabel: "Specialization",
      locationValue: row.specialization,
      totalAmount: money(row.total_amount),
      status: row.status || "pending",
      detailTitle: "Selected Specialization",
      items: [
        {
          name: row.specialization || "Tele Consultation",
          price: money(row.total_amount),
        },
      ],
      createdAt: row.created_at,
    })),

    ...Array.from(pharmacyMap.values()),
  ];

  return bookings.sort(
    (a, b) =>
      new Date(b.createdAt || b.date || 0) -
      new Date(a.createdAt || a.date || 0)
  );
};

module.exports = {
  upsertProfile,
  findProfileByUserId,
  getPatientFullProfileByUserId,
  updatePatientFullProfileByUserId,
  getAllPatientBookingsByUserId,
};