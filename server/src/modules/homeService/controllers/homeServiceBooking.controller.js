const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const asyncHandler = require("../../../shared/utils/asyncHandler");
const AppError = require("../../../shared/utils/AppError");
const { successResponse } = require("../../../shared/utils/response");

const { getActiveHomeServiceTestsByIds } = require("../models/homeService.model");

const {
  createHomeServiceBooking,
  getPhleboProfileByUserId,
  upsertPhleboLiveLocation,
  getPhleboHomeServiceBookings,
  getCompletedBookingsForPhlebo,
  getRejectedBookingsForPhlebo,
  resubmitRejectedBooking,
  acceptHomeServiceBooking,
  getPhleboActiveBooking,
  updateHomeServiceBookingStatus,
  getPhleboWalletSummary,
} = require("../models/homeServiceBooking.model");

function saveBase64Prescription(base64File) {
  if (!base64File) return null;

  const matches = base64File.match(
    /^data:(image\/png|image\/jpeg|application\/pdf);base64,(.+)$/
  );

  if (!matches) throw new AppError("Invalid prescription file format", 400);

  const mimeType = matches[1];
  const base64Data = matches[2];
  const buffer = Buffer.from(base64Data, "base64");

  if (buffer.length > 5 * 1024 * 1024) {
    throw new AppError("Prescription file must be less than 5 MB", 400);
  }

  const extension =
    mimeType === "image/png" ? "png" : mimeType === "image/jpeg" ? "jpg" : "pdf";

  const uploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const fileName = `${crypto.randomUUID()}.${extension}`;
  fs.writeFileSync(path.join(uploadDir, fileName), buffer);

  return `/uploads/${fileName}`;
}

function isValidMobile(mobile) {
  return /^[6-9]\d{9}$/.test(String(mobile || ""));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
}

function isValidCoordinate(value) {
  return Number.isFinite(Number(value));
}

const bookHomeServiceController = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (req.user.role !== "patient") {
    throw new AppError("Only patients can book home service tests", 403);
  }

  const {
    patientName, patientAge, patientSex, patientMobile, patientEmail,
    patientAddress, patientLat, patientLng, branch, tests, collectionDate,
    timeSlot, prescription,
  } = req.body;

  if (!patientName || !patientAge || !patientSex || !patientMobile ||
      !patientEmail || !patientAddress || !branch || !collectionDate || !timeSlot) {
    throw new AppError("Missing required booking fields", 400);
  }

  const age = Number(patientAge);
  if (!Number.isInteger(age) || age < 1 || age > 120) {
    throw new AppError("Enter valid patient age", 400);
  }

  if (!["Male", "Female", "Other"].includes(patientSex)) {
    throw new AppError("Invalid patient gender", 400);
  }

  if (!isValidMobile(patientMobile)) throw new AppError("Invalid mobile number", 400);
  if (!isValidEmail(patientEmail)) throw new AppError("Invalid email address", 400);

  if (!Array.isArray(tests) || tests.length === 0) {
    throw new AppError("Please select at least one test", 400);
  }

  if (tests.length > 2) throw new AppError("Maximum 2 tests allowed per booking", 400);

  if (!isValidCoordinate(patientLat) || !isValidCoordinate(patientLng)) {
    throw new AppError(
      "Patient GPS location is required. Please click Use Current Location before booking.",
      400
    );
  }

  const requestedTestIds = tests.map((test) => Number(test.id));
  const dbTests = await getActiveHomeServiceTestsByIds(requestedTestIds);

  if (dbTests.length !== requestedTestIds.length) {
    throw new AppError("One or more selected tests are invalid", 400);
  }

  const totalAmount = dbTests.reduce((sum, test) => sum + Number(test.price || 0), 0);
  const prescriptionPath = saveBase64Prescription(prescription);

  const booking = await createHomeServiceBooking({
    userId,
    patientName: patientName.trim(),
    patientAge: age,
    patientSex,
    patientMobile: patientMobile.trim(),
    patientEmail: patientEmail.trim().toLowerCase(),
    patientAddress: patientAddress.trim(),
    patientLat: Number(patientLat),
    patientLng: Number(patientLng),
    branch,
    tests: dbTests,
    collectionDate,
    timeSlot,
    prescriptionPath,
    totalAmount,
    status: "pending",
  });

  return successResponse({
    res, status: 201,
    message: "Home service booking created successfully",
    data: booking,
  });
});

const getPhleboProfileController = asyncHandler(async (req, res) => {
  if (req.user.role !== "phlebo") {
    throw new AppError("Only phlebos can access this profile", 403);
  }

  const profile = await getPhleboProfileByUserId(req.user.id);
  if (!profile) throw new AppError("Phlebo profile not found", 404);

  return successResponse({
    res, status: 200,
    message: "Phlebo profile retrieved successfully",
    data: profile,
  });
});

const updatePhleboLocationController = asyncHandler(async (req, res) => {
  if (req.user.role !== "phlebo") {
    throw new AppError("Only phlebos can update live location", 403);
  }

  const { latitude, longitude, isAvailable = true } = req.body;

  if (!isValidCoordinate(latitude) || !isValidCoordinate(longitude)) {
    throw new AppError("Valid latitude and longitude are required", 400);
  }

  const location = await upsertPhleboLiveLocation({
    phleboUserId: req.user.id,
    latitude: Number(latitude),
    longitude: Number(longitude),
    isAvailable: Boolean(isAvailable),
  });

  return successResponse({
    res, status: 200,
    message: "Phlebo location updated successfully",
    data: location,
  });
});

const listPhleboHomeServiceBookingsController = asyncHandler(async (req, res) => {
  if (req.user.role !== "phlebo") {
    throw new AppError("Only phlebos can access home service bookings", 403);
  }

  const bookings = await getPhleboHomeServiceBookings(req.user.id);

  return successResponse({
    res, status: 200,
    message: "Nearby and active home service bookings retrieved successfully",
    data: bookings,
  });
});

const listCompletedPhleboBookingsController = asyncHandler(async (req, res) => {
  if (req.user.role !== "phlebo") {
    throw new AppError("Only phlebos can access completed collections", 403);
  }

  const bookings = await getCompletedBookingsForPhlebo(req.user.id);

  return successResponse({
    res, status: 200,
    message: "Completed collections retrieved successfully",
    data: bookings,
  });
});

const listRejectedPhleboBookingsController = asyncHandler(async (req, res) => {
  if (req.user.role !== "phlebo") {
    throw new AppError("Only phlebos can access rejected collections", 403);
  }

  const bookings = await getRejectedBookingsForPhlebo(req.user.id);

  return successResponse({
    res, status: 200,
    message: "Rejected collections retrieved successfully",
    data: bookings,
  });
});

const resubmitRejectedBookingController = asyncHandler(async (req, res) => {
  if (req.user.role !== "phlebo") {
    throw new AppError("Only phlebos can resubmit collections", 403);
  }

  const bookingId = Number(req.params.bookingId);
  if (!Number.isInteger(bookingId) || bookingId <= 0) {
    throw new AppError("Invalid booking ID", 400);
  }

  const updated = await resubmitRejectedBooking(bookingId, req.user.id);
  if (!updated) {
    throw new AppError(
      "Could not resubmit. Booking may not be rejected or not assigned to you.",
      400
    );
  }

  return successResponse({
    res, status: 200,
    message: "Booking resubmitted to lab successfully",
  });
});

// FIXED: handles the result object from acceptHomeServiceBooking correctly.
const acceptHomeServiceBookingController = asyncHandler(async (req, res) => {
  if (req.user.role !== "phlebo") {
    throw new AppError("Only phlebos can accept home service bookings", 403);
  }

  const bookingId = Number(req.params.bookingId);
  if (!Number.isInteger(bookingId) || bookingId <= 0) {
    throw new AppError("Invalid booking ID", 400);
  }

  const result = await acceptHomeServiceBooking(bookingId, req.user.id);

  if (!result.accepted) {
    if (result.reason === "off_shift") {
    throw new AppError(
      "You are currently off shift and cannot accept collections.",
      403
    );
    }
    if (result.reason === "active_booking_exists") {
  throw new AppError(
    "You already have an active collection. Complete the current collection before accepting another booking.",
    409
  );
}
    if (result.reason === "not_found") {
      throw new AppError("Booking not found", 404);
    }

    if (result.reason === "accepted_by_another") {
      throw new AppError("This booking is already accepted by another phlebo", 409);
    }

    if (result.reason === "not_pending") {
      throw new AppError("This booking is no longer pending", 409);
    }

    // race_condition — another phlebo grabbed it between SELECT and UPDATE
    throw new AppError("Unable to accept this booking. Please refresh and try again.", 409);
  }

  return successResponse({
    res,
    status: 200,
    message: result.alreadyAssignedToMe
      ? "This booking is already in your active collection"
      : "Home service booking accepted successfully",
  });
});

const getPhleboActiveBookingController = asyncHandler(async (req, res) => {
  if (req.user.role !== "phlebo") {
    throw new AppError("Only phlebos can access active collection", 403);
  }

  const booking = await getPhleboActiveBooking(req.user.id);

  return successResponse({
    res, status: 200,
    message: "Active booking retrieved successfully",
    data: booking,
  });
});

const updateHomeServiceBookingStatusController = asyncHandler(async (req, res) => {
  if (req.user.role !== "phlebo") {
    throw new AppError("Only phlebos can update booking status", 403);
  }

  const bookingId = Number(req.params.bookingId);
  if (!Number.isInteger(bookingId) || bookingId <= 0) {
    throw new AppError("Invalid booking ID", 400);
  }

  const { status, phleboNotes } = req.body;

  if (!status) {
    throw new AppError("Status is required", 400);
  }

  const updated = await updateHomeServiceBookingStatus(
    bookingId,
    req.user.id,
    status,
    phleboNotes || null
  );

  if (!updated) {
    throw new AppError(
      "Unable to update status. Booking not found or not assigned to this phlebo.",
      400
    );
  }

  return successResponse({
    res, status: 200,
    message: "Booking status updated successfully",
  });
});

const getPhleboWalletController = asyncHandler(async (req, res) => {
  if (req.user.role !== "phlebo") {
    throw new AppError("Only phlebos can access wallet", 403);
  }

  const wallet = await getPhleboWalletSummary(req.user.id);

  return successResponse({
    res,
    status: 200,
    message: "Phlebo wallet retrieved successfully",
    data: wallet,
  });
});

module.exports = {
  bookHomeServiceController,
  getPhleboProfileController,
  updatePhleboLocationController,
  listPhleboHomeServiceBookingsController,
  listCompletedPhleboBookingsController,
  listRejectedPhleboBookingsController,
  resubmitRejectedBookingController,
  acceptHomeServiceBookingController,
  getPhleboActiveBookingController,
  updateHomeServiceBookingStatusController,
  getPhleboWalletController,
};