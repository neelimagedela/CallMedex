const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const asyncHandler = require("../../../shared/utils/asyncHandler");
const { successResponse } = require("../../../shared/utils/response");
const AppError = require("../../../shared/utils/AppError");

const {
  createAppointment,
  getAppointmentsByUserId,
} = require("../models/appointment.model");

const saveBase64Prescription = (prescription) => {
  if (!prescription) return null;

  const match = prescription.match(/^data:([^;]+);base64,(.+)$/);

  let fileBuffer;
  let fileExtension = "png";

  if (match) {
    const contentType = match[1];
    fileBuffer = Buffer.from(match[2], "base64");
    fileExtension =
      contentType === "application/pdf"
        ? "pdf"
        : contentType === "image/jpeg"
        ? "jpg"
        : "png";
  } else {
    fileBuffer = Buffer.from(prescription, "base64");
  }

  const uploadDir = path.join(process.cwd(), "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filename = `${crypto.randomUUID()}.${fileExtension}`;
  const absolutePath = path.join(uploadDir, filename);

  fs.writeFileSync(absolutePath, fileBuffer);

  return `/uploads/${filename}`;
};

const bookAppointmentController = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (req.user.role !== "patient") {
    throw new AppError("Only patients can book scan appointments", 403);
  }

  const {
    patientName,
    patientAge,
    patientSex,
    patientMobile,
    patientEmail,
    patientAddress,
    branch,
    scans,
    appointmentDate,
    timeSlot,
    prescription,
    totalAmount,
  } = req.body;

  if (
    !patientName ||
    !patientAge ||
    !patientSex ||
    !patientMobile ||
    !patientEmail ||
    !patientAddress ||
    !branch ||
    !scans ||
    !appointmentDate ||
    !timeSlot
  ) {
    throw new AppError("All required booking fields must be provided", 400);
  }

  let prescriptionPath = null;

  try {
    prescriptionPath = saveBase64Prescription(prescription);
  } catch (err) {
    console.error("Failed to save prescription file:", err);
  }

  const appointment = await createAppointment({
    userId,
    patientName,
    patientAge: Number(patientAge),
    patientSex,
    patientMobile,
    patientEmail,
    patientAddress,
    branch,
    scans,
    appointmentDate,
    timeSlot,
    prescriptionPath,
    totalAmount: Number(totalAmount) || 0,
  });

  return successResponse({
    res,
    status: 201,
    message: "Appointment booked successfully",
    data: appointment,
  });
});

const listAppointmentsController = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  const appointments = await getAppointmentsByUserId(userId);

  return successResponse({
    res,
    status: 200,
    message: "Appointments retrieved successfully",
    data: appointments,
  });
});

module.exports = {
  bookAppointmentController,
  listAppointmentsController,
};