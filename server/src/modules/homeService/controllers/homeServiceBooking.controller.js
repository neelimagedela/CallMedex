const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const asyncHandler = require("../../../shared/utils/asyncHandler");
const AppError = require("../../../shared/utils/AppError");
const { successResponse } = require("../../../shared/utils/response");

const {
  getActiveHomeServiceTestsByIds,
} = require("../models/homeService.model");

const {
  createHomeServiceBooking,
  getPhleboHomeServiceBookings,
} = require("../models/homeServiceBooking.model");

function saveBase64Prescription(base64File) {
  if (!base64File) return null;

  const matches = base64File.match(
    /^data:(image\/png|image\/jpeg|application\/pdf);base64,(.+)$/
  );

  if (!matches) {
    throw new AppError("Invalid prescription file format", 400);
  }

  const mimeType = matches[1];
  const base64Data = matches[2];

  const buffer = Buffer.from(base64Data, "base64");

  if (buffer.length > 5 * 1024 * 1024) {
    throw new AppError("Prescription file must be less than 5 MB", 400);
  }

  const extension =
    mimeType === "image/png"
      ? "png"
      : mimeType === "image/jpeg"
      ? "jpg"
      : "pdf";

  const uploadDir = path.join(__dirname, "../../../../uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `${crypto.randomUUID()}.${extension}`;
  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, buffer);

  return `/uploads/${fileName}`;
}

function isValidMobile(mobile) {
  return /^[6-9]\d{9}$/.test(String(mobile || ""));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
}

const bookHomeServiceController = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (req.user.role !== "patient") {
    throw new AppError("Only patients can book home service tests", 403);
  }

  const {
    patientName,
    patientAge,
    patientSex,
    patientMobile,
    patientEmail,
    patientAddress,
    branch,
    tests,
    collectionDate,
    timeSlot,
    prescription,
  } = req.body;

  if (
    !patientName ||
    !patientAge ||
    !patientSex ||
    !patientMobile ||
    !patientEmail ||
    !patientAddress ||
    !branch ||
    !collectionDate ||
    !timeSlot
  ) {
    throw new AppError("Missing required booking fields", 400);
  }

  const age = Number(patientAge);

  if (!Number.isInteger(age) || age < 1 || age > 120) {
    throw new AppError("Enter valid patient age", 400);
  }

  if (!["Male", "Female", "Other"].includes(patientSex)) {
    throw new AppError("Invalid patient gender", 400);
  }

  if (!isValidMobile(patientMobile)) {
    throw new AppError("Invalid mobile number", 400);
  }

  if (!isValidEmail(patientEmail)) {
    throw new AppError("Invalid email address", 400);
  }

  if (!Array.isArray(tests) || tests.length === 0) {
    throw new AppError("Please select at least one test", 400);
  }

  if (tests.length > 2) {
    throw new AppError("Maximum 2 tests allowed per booking", 400);
  }

  const requestedTestIds = tests.map((test) => test.id);

  const dbTests = await getActiveHomeServiceTestsByIds(requestedTestIds);

  if (dbTests.length !== requestedTestIds.length) {
    throw new AppError("One or more selected tests are invalid", 400);
  }

  const totalAmount = dbTests.reduce(
    (sum, test) => sum + Number(test.price || 0),
    0
  );

  const prescriptionPath = saveBase64Prescription(prescription);

  const booking = await createHomeServiceBooking({
    userId,
    patientName: patientName.trim(),
    patientAge: age,
    patientSex,
    patientMobile: patientMobile.trim(),
    patientEmail: patientEmail.trim().toLowerCase(),
    patientAddress: patientAddress.trim(),
    branch,
    tests: dbTests,
    collectionDate,
    timeSlot,
    prescriptionPath,
    totalAmount,
    status: "pending",
  });

  return successResponse({
    res,
    status: 201,
    message: "Home service booking created successfully",
    data: booking,
  });
});

const listPhleboHomeServiceBookingsController = asyncHandler(async (req, res) => {
  if (req.user.role !== "phlebo") {
    throw new AppError("Only phlebos can access home service bookings", 403);
  }

  const bookings = await getPhleboHomeServiceBookings(req.user.id);

  return successResponse({
    res,
    status: 200,
    message: "Phlebo home service bookings retrieved successfully",
    data: bookings,
  });
});

module.exports = {
  bookHomeServiceController,
  listPhleboHomeServiceBookingsController,
};