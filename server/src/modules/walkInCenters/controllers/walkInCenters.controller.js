const asyncHandler = require("../../../shared/utils/asyncHandler");
const AppError = require("../../../shared/utils/AppError");
const { successResponse } = require("../../../shared/utils/response");

const {
  getActiveHomeServiceTestsByIds,
} = require("../../homeService/models/homeService.model");

const {
  createWalkInCenterBooking,
} = require("../models/walkInCenters.model");

function isValidMobile(mobile) {
  return /^[6-9]\d{9}$/.test(String(mobile || ""));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
}

const bookWalkInCenterController = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (req.user.role !== "patient") {
    throw new AppError("Only patients can book walk-in center tests", 403);
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
    walkinDate,
    timeSlot,
  } = req.body;

  if (
    !patientName ||
    !patientAge ||
    !patientSex ||
    !patientMobile ||
    !patientEmail ||
    !patientAddress ||
    !branch ||
    !walkinDate ||
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

  const booking = await createWalkInCenterBooking({
    userId,
    patientName: patientName.trim(),
    patientAge: age,
    patientSex,
    patientMobile: patientMobile.trim(),
    patientEmail: patientEmail.trim().toLowerCase(),
    patientAddress: patientAddress.trim(),
    branch,
    tests: dbTests,
    walkinDate,
    timeSlot,
    totalAmount,
    status: "pending",
  });

  return successResponse({
    res,
    status: 201,
    message: "Walk-in center test booked successfully",
    data: booking,
  });
});

module.exports = {
  bookWalkInCenterController,
};