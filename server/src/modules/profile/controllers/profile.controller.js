const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const asyncHandler = require("../../../shared/utils/asyncHandler");
const { successResponse } = require("../../../shared/utils/response");
const { upsertProfile, findProfileByUserId } = require("../models/profile.model");
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

module.exports = {
  onboardProfileController,
  getProfileController,
};