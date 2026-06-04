const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const asyncHandler = require("../../../shared/utils/asyncHandler");
const { successResponse } = require("../../../shared/utils/response");
const AppError = require("../../../shared/utils/AppError");

const {
  upsertProfile,
  findProfileByUserId,
  getPatientFullProfileByUserId,
  updatePatientFullProfileByUserId,
  getAllPatientBookingsByUserId,
} = require("../models/profile.model");

const { findUserById } = require("../../auth/models/user.model");

/*
  Known profile fields that arrive as base64 files.
  We save these files to uploads and store only the file path in DB.
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
  "pharmacyImages",

  // Organization
  "registrationCertificate",
  "governmentLicense",
  "authorizedPersonIdProof",

  // Admin
  "aadhaarUpload",
  "governmentIdProof",
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

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

function saveBase64File(base64String, fieldName) {
  if (!base64String || typeof base64String !== "string") return null;

  const dataUriMatch = base64String.match(/^data:([^;]+);base64,(.+)$/);

  let mimeType;
  let rawBase64;

  if (dataUriMatch) {
    mimeType = dataUriMatch[1].toLowerCase();
    rawBase64 = dataUriMatch[2];
  } else {
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
    throw new AppError(`Field "${fieldName}" exceeds the 5 MB size limit.`, 400);
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

function processFileFields(profileData) {
  const processed = { ...profileData };

  for (const key of FILE_FIELDS) {
    if (
      key in processed &&
      processed[key] &&
      typeof processed[key] === "string" &&
      processed[key].length > 255
    ) {
      processed[key] = saveBase64File(processed[key], key);
    }
  }

  return processed;
}

function normalizeRole(role) {
  if (role === "phlebotomist") return "phlebo";
  return role;
}

const onboardProfileController = asyncHandler(async (req, res) => {
  /*
    This route is used after OTP verification.
    During this flow the user may not have JWT yet, so we allow userId from body.
  */
  const userId = req.user?.id || req.body.userId;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  /*
    Fix:
    Earlier role was only taken from req.user or req.body.
    If frontend sends role undefined, profile.model.js receives undefined
    and throws: Invalid role for onboarding: undefined.
    Now backend safely fetches role from users table using userId.
  */
  let role = req.user?.role || req.body.role;

  if (!role) {
    const user = await findUserById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    role = user.role;
  }

  role = normalizeRole(role);

  if (!role) {
    throw new AppError("User role is required", 400);
  }

  const { userId: _uid, role: _role, ...rawProfileData } = req.body;

  const profileData = processFileFields(rawProfileData);

  await upsertProfile({
  userId,
  role,
  ...profileData,
});

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
  const role = normalizeRole(req.user?.role);

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

function formatDateForInput(value) {
  if (!value) return "";

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString().slice(0, 10);
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

function formatPatientProfile(profile) {
  const dob = formatDateForInput(profile.dob);

  return {
    name: profile.name || "",
    email: profile.email || "",
    phone: profile.phone || "",
    gender: profile.gender || "",
    dob,
    age: dob ? calculateAgeFromDob(dob) : "",
    address: profile.address || "",
    city: profile.city || "",
    district: profile.district || "",
    state: profile.state || "",
    pincode: profile.pincode || "",
    country: profile.country || "India",
    bloodGroup: profile.blood_group || "",
    height: profile.height || "",
    weight: profile.weight || "",
    medicalHistory: parseJsonArray(profile.medical_history),
    hasOtherCondition: Boolean(profile.has_other_condition),
    otherCondition: profile.other_condition || "",
  };
}

function validatePatientUpdate(data) {
  const errors = [];

  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim().toLowerCase();
  const phone = String(data.phone || "").trim();
  const gender = String(data.gender || "").trim();
  const dob = String(data.dob || "").trim();
  const address = String(data.address || "").trim();
  const city = String(data.city || "").trim();
  const district = String(data.district || "").trim();
  const state = String(data.state || "").trim();
  const pincode = String(data.pincode || "").trim();
  const country = String(data.country || "India").trim();

  const bloodGroup = String(data.bloodGroup || "").trim();
  const height = data.height === "" || data.height == null ? null : Number(data.height);
  const weight = data.weight === "" || data.weight == null ? null : Number(data.weight);

  if (!name) errors.push("Name is required");
  if (!/^[a-zA-Z\s]+$/.test(name)) errors.push("Name must contain only letters");
  if (name.length < 3) errors.push("Name must be at least 3 characters");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Valid email is required");
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    errors.push("Valid 10-digit phone number is required");
  }

  if (!allowedGenders.includes(gender)) {
    errors.push("Valid gender is required");
  }

  const age = calculateAgeFromDob(dob);

  if (!dob || age === null || age < 0 || age > 120) {
    errors.push("Valid date of birth is required");
  }

  if (!address) errors.push("Address is required");
  if (!city) errors.push("City is required");
  if (!state) errors.push("State is required");

  if (!/^\d{6}$/.test(pincode)) {
    errors.push("Valid 6-digit pincode is required");
  }

  if (bloodGroup && !allowedBloodGroups.includes(bloodGroup)) {
    errors.push("Invalid blood group");
  }

  if (height !== null && (!Number.isFinite(height) || height < 30 || height > 250)) {
    errors.push("Height must be between 30 and 250 cm");
  }

  if (weight !== null && (!Number.isFinite(weight) || weight < 1 || weight > 300)) {
    errors.push("Weight must be between 1 and 300 kg");
  }

  if (
    Array.isArray(data.medicalHistory) &&
    data.medicalHistory.includes("Other") &&
    !String(data.otherCondition || "").trim()
  ) {
    errors.push("Other medical condition is required");
  }

  if (errors.length > 0) {
    throw new AppError(errors[0], 400);
  }

  return {
    name,
    email,
    phone,
    gender,
    dob,
    address,
    city,
    district,
    state,
    pincode,
    country,

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

const getPatientBookingsController = asyncHandler(async (req, res) => {
  if (req.user.role !== "patient") {
    throw new AppError("Only patients can view previous bookings", 403);
  }

  const bookings = await getAllPatientBookingsByUserId(req.user.id);

  return successResponse({
    res,
    status: 200,
    message: "Patient bookings retrieved successfully",
    data: bookings,
  });
});

module.exports = {
  onboardProfileController,
  getProfileController,
  getPatientProfileController,
  updatePatientProfileController,
  getPatientBookingsController,
};