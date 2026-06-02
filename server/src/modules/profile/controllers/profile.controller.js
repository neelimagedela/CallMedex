const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const asyncHandler = require("../../../shared/utils/asyncHandler");
const { successResponse } = require("../../../shared/utils/response");
const {
  upsertProfile,
  findProfileByUserId,
  getPatientFullProfileByUserId,
  updatePatientFullProfileByUserId,
  findPatientBookingsByUserId,
  findPatientConsultationBookingsByUserId,
  findPatientClinicBookingsByUserId,
} = require("../models/profile.model");
const AppError = require("../../../shared/utils/AppError");

/**
 * Known profile fields that arrive as base64-encoded files.
 * These are saved to disk and their paths stored in the DB instead
 * of the raw base64 string (which would overflow VARCHAR columns).
 */
const FILE_FIELDS = new Set([
  // Phlebo
  "aadhaarFront",
  "phlebotomyCertificate",
  // Doctor
  "medicalCertificate",
  "medicalLicense",
  "idProof",
  // Pharmacy
  "drugLicenseDocument",
  "gstCertificate",
  "pharmacistCertificate",
  "ownerIdProof",
  // Organization
  "registrationCertificate",
  "governmentLicense",
  "authorizedPersonIdProof",
  // Admin
  "aadhaarUpload",
  "governmentIdProof",
  "pharmacyImages",
]);

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
]);

const EXTENSION_MAP = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "application/pdf": "pdf",
};

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Saves a base64-encoded file to the uploads directory.
 * Returns the server-relative path (e.g. /uploads/uuid.jpg).
 * Throws AppError on invalid format, unsupported type, or size limit exceeded.
 */
function saveBase64File(base64String, fieldName) {
  if (!base64String || typeof base64String !== "string") return null;

  // Accept both raw base64 and data-URI format
  const dataUriMatch = base64String.match(/^data:([^;]+);base64,(.+)$/);

  let mimeType;
  let rawBase64;

  if (dataUriMatch) {
    mimeType = dataUriMatch[1].toLowerCase();
    rawBase64 = dataUriMatch[2];
  } else {
    // Treat as raw base64 — default to JPEG so it still saves
    mimeType = "image/jpeg";
    rawBase64 = base64String;
  }

  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    throw new AppError(
      `Field "${fieldName}" has unsupported file type: ${mimeType}. Allowed: jpg, png, pdf.`,
      400
    );
  }

  const buffer = Buffer.from(rawBase64, "base64");

  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    throw new AppError(
      `Field "${fieldName}" exceeds the 5 MB size limit.`,
      400
    );
  }

  const ext = EXTENSION_MAP[mimeType];
  const uploadDir = path.join(__dirname, "../../../../../uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `${crypto.randomUUID()}.${ext}`;
  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, buffer);

  return `/uploads/${fileName}`;
}

/**
 * Iterates over profileData, detects base64 file fields, saves them
 * to disk, and replaces their values with the saved file path.
 */
function processFileFields(profileData) {
  const processed = { ...profileData };

  for (const key of FILE_FIELDS) {
    if (
      key in processed &&
      processed[key] &&
      typeof processed[key] === "string" &&
      processed[key].length > 255 // heuristic: real paths are short
    ) {
      processed[key] = saveBase64File(processed[key], key);
    }
  }

  return processed;
}

const onboardProfileController = asyncHandler(async (req, res) => {
  // Accept either JWT-authenticated user or userId/role passed in body
  // (during the initial register → OTP → onboard flow before a session exists)
  const userId = req.user?.id || req.body.userId;
  const role = req.user?.role || req.body.role;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  if (!role) {
    throw new AppError("User role is required", 400);
  }

  // Strip meta params so they don't leak into the profile table
  const { userId: _uid, role: _role, ...rawProfileData } = req.body;

  // Convert base64 file fields → file paths before hitting the DB
  const profileData = processFileFields(rawProfileData);

  await upsertProfile(userId, role, profileData);

  return successResponse({
    res,
    status: 200,
    message: "Profile onboarded successfully",
    data: {
      userId,
      role,
      registrationStatus: "PROFILE_COMPLETED",
    },
  });
});

const getProfileController = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const role = req.user?.role;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  const profile = await findProfileByUserId(userId, role);

  return successResponse({
    res,
    status: 200,
    message: "Profile retrieved successfully",
    data: profile,
  });
});
const allowedBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const allowedGenders = ["male", "female", "other"];

function calculateAgeFromDob(dob) {
  if (!dob) return null;

  const birthDate = new Date(dob);
  const today = new Date();

  if (Number.isNaN(birthDate.getTime())) return null;
  if (birthDate >= today) return null;

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age;
}

function parseMedicalHistory(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function formatDateForInput(value) {
  if (!value) return "";

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
function formatPatientProfile(row) {
  return {
    id: row.public_user_id,
    internalId: row.id,
    role: row.role,

    name: row.name || "",
    email: row.email || "",
    phone: row.phone || "",
    gender: row.gender || "",
    dob: formatDateForInput(row.dob),
    age: calculateAgeFromDob(row.dob),

    address: row.address || "",
    city: row.city || "",
    district: row.district || "",
    state: row.state || "",
    pincode: row.pincode || "",
    country: row.country || "India",

    bloodGroup: row.blood_group || "",
    height: row.height ? String(row.height) : "",
    weight: row.weight ? String(row.weight) : "",
    medicalHistory: parseMedicalHistory(row.medical_history),
    hasOtherCondition: Boolean(row.has_other_condition),
    otherCondition: row.other_condition || "",
    registrationStatus: row.registration_status,
  };
}

function validatePatientUpdate(data) {
  const name = String(data.name || "").trim();
  const phone = String(data.phone || "").trim();
  const email = String(data.email || "").trim().toLowerCase();
  const gender = String(data.gender || "").trim().toLowerCase();
  const dob = formatDateForInput(data.dob);
  const pincode = String(data.pincode || "").trim();
  const bloodGroup = String(data.bloodGroup || "").trim();

  const height =
    data.height === "" || data.height === null || data.height === undefined
      ? null
      : Number(data.height);

  const weight =
    data.weight === "" || data.weight === null || data.weight === undefined
      ? null
      : Number(data.weight);

  if (name.length < 3 || name.length > 100) {
    throw new AppError("Name must be between 3 and 100 characters", 400);
  }

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    throw new AppError("Name must contain only letters and spaces", 400);
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    throw new AppError("Enter a valid 10-digit Indian mobile number", 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppError("Enter a valid email address", 400);
  }

  if (gender && !allowedGenders.includes(gender)) {
    throw new AppError("Invalid gender selected", 400);
  }

  if (dob) {
    const age = calculateAgeFromDob(dob);

    if (age === null || age < 0 || age > 120) {
      throw new AppError("Enter a valid date of birth", 400);
    }
  }

  if (pincode && !/^\d{6}$/.test(pincode)) {
    throw new AppError("Enter a valid 6-digit pincode", 400);
  }

  if (bloodGroup && !allowedBloodGroups.includes(bloodGroup)) {
    throw new AppError("Invalid blood group selected", 400);
  }

  if (
    height !== null &&
    (!Number.isFinite(height) || height < 30 || height > 250)
  ) {
    throw new AppError("Height must be between 30 and 250 cm", 400);
  }

  if (
    weight !== null &&
    (!Number.isFinite(weight) || weight < 1 || weight > 300)
  ) {
    throw new AppError("Weight must be between 1 and 300 kg", 400);
  }

  return {
    name,
    phone,
    email,
    gender: gender || null,
    dob: dob || null,
    address: String(data.address || "").trim(),
    city: String(data.city || "").trim(),
    district: String(data.district || "").trim(),
    state: String(data.state || "").trim(),
    pincode: pincode || null,
    country: String(data.country || "India").trim(),

    bloodGroup: bloodGroup || null,
    height,
    weight,
    medicalHistory: Array.isArray(data.medicalHistory)
      ? data.medicalHistory
      : [],
    hasOtherCondition: Boolean(data.hasOtherCondition),
    otherCondition: String(data.otherCondition || "").trim(),
  };
}

const getPatientProfileController = asyncHandler(async (req, res) => {
  if (req.user.role !== "patient") {
    throw new AppError("Only patients can access patient profile", 403);
  }

  const profile = await getPatientFullProfileByUserId(req.user.id);

  if (!profile) {
    throw new AppError("Patient profile not found", 404);
  }

  return successResponse({
    res,
    status: 200,
    message: "Patient profile retrieved successfully",
    data: formatPatientProfile(profile),
  });
});

const updatePatientProfileController = asyncHandler(async (req, res) => {
  if (req.user.role !== "patient") {
    throw new AppError("Only patients can update patient profile", 403);
  }

  const validated = validatePatientUpdate(req.body);

  const updatedProfile = await updatePatientFullProfileByUserId(
    req.user.id,
    validated
  );

  return successResponse({
    res,
    status: 200,
    message: "Patient profile updated successfully",
    data: formatPatientProfile(updatedProfile),
  });
});
function parseScans(value) {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatBooking(row) {
  return {
    id: row.id,
    receiptId: row.receipt_id,
    patientName: row.patient_name,
    patientAge: row.patient_age,
    patientSex: row.patient_sex,
    patientMobile: row.patient_mobile,
    patientEmail: row.patient_email,
    patientAddress: row.patient_address,
    branch: row.branch,
    scans: parseScans(row.scans),
    appointmentDate: row.appointment_date
      ? String(row.appointment_date).slice(0, 10)
      : "",
    timeSlot: row.time_slot,
    prescriptionPath: row.prescription_path,
    totalAmount: Number(row.total_amount || 0),
    status: row.status,
    createdAt: row.created_at,
  };
}

const getPatientBookingsController = asyncHandler(async (req, res) => {
  if (req.user.role !== "patient") {
    throw new AppError("Only patients can view previous bookings", 403);
  }

  const scanBookings = await findPatientBookingsByUserId(req.user.id);

  const consultationBookings =
    await findPatientConsultationBookingsByUserId(req.user.id);

  const clinicBookings =
    await findPatientClinicBookingsByUserId(req.user.id);

  const allBookings = [
    ...scanBookings.map((booking) => ({
      ...formatBooking(booking),
      bookingType: "scan",
    })),

    ...consultationBookings.map((booking) => ({
      id: booking.id,
      receiptId: booking.receipt_id,
      bookingType: "consultation",

      patientName: booking.patient_name,
      patientMobile: booking.patient_phone,

      appointmentDate: booking.appointment_date,
      timeSlot: booking.time_slot,

      totalAmount: Number(booking.total_amount),
      status: booking.booking_status,

      branch: "Consultation at Home",
      scans: [],
    })),

    ...clinicBookings.map((booking) => ({
      id: booking.id,
      receiptId: booking.receipt_id,
      bookingType: "walkin",

      patientName: booking.patient_name,
      patientAge: booking.patient_age,
      patientSex: booking.patient_gender,
      patientMobile: booking.patient_mobile,
      patientEmail: booking.patient_email,
      patientAddress: booking.patient_address,

      appointmentDate: booking.appointment_date
        ? String(booking.appointment_date).slice(0, 10)
        : "",
      timeSlot: booking.time_slot,

      totalAmount: Number(booking.consultation_fee || 0),
      status: booking.status,

      branch: booking.clinic_branch,
      scans: [],
    })),
  ].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  return successResponse({
    res,
    status: 200,
    message: "Patient bookings retrieved successfully",
    data: allBookings,
  });
});
module.exports = {
  onboardProfileController,
  getProfileController,
  getPatientProfileController,
  updatePatientProfileController,
  getPatientBookingsController,
};