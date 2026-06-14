const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const asyncHandler = require("../../shared/utils/asyncHandler");
const staffModel = require("./staff.model");

const mapLabStatus = (status = "") => {
  const v = String(status).toLowerCase();

  if (["pending", "confirmed", "assigned", "accepted"].includes(v)) {
    return "samples";
  }

  if (
    ["sample_collected", "submitted_to_lab", "sample_received"].includes(v)
  ) {
    return "sample_received";
  }

  if (["processing", "report_ready"].includes(v)) {
    return "reports_ready";
  }

  if (v === "completed") {
    return "completed";
  }

  if (v === "sample_rejected") {
    return "rejected";
  }

  return "samples";
};

const WALKIN_NEXT = {
  pending: "sample_received",
  confirmed: "sample_received",
  sample_received: "report_ready",
  report_ready: "completed",
};

const SCAN_NEXT = {
  pending: "sample_received",
  confirmed: "sample_received",
  sample_received: "report_ready",
  report_ready: "completed",
};

const HOME_NEXT = {
  submitted_to_lab: "processing",
  processing: "report_ready",
  report_ready: "completed",
};

const getAuthenticatedStaff = async (req, res) => {
  const userId = req.user?.id || req.user?.userId;

  if (!userId) {
    res.status(401).json({
      success: false,
      message: "User not found in token. Please login again.",
    });
    return null;
  }

  const staffProfile = await staffModel.getStaffProfileByUserId(userId);

  if (!staffProfile) {
    res.status(404).json({
      success: false,
      message: "Staff profile not found.",
    });
    return null;
  }

  const role = staffProfile.staff_role?.toLowerCase().trim();

  if (role !== "lab technician" && role !== "lab_technician") {
    res.status(403).json({
      success: false,
      message: "Only Lab Technician staff can access this.",
    });
    return null;
  }

  return { userId, staffProfile };
};

const getLabTechnicianDashboard = asyncHandler(async (req, res) => {
  const auth = await getAuthenticatedStaff(req, res);
  if (!auth) return;

  const bookings = await staffModel.getBranchLabBookings(
    auth.staffProfile.organization_name
  );

  const mappedBookings = bookings.map((booking) => ({
    ...booking,
    labStatus: mapLabStatus(booking.status),
  }));

  return res.json({
    success: true,
    data: {
      branch: auth.staffProfile.organization_name,
      staffProfile: {
        name: auth.staffProfile.staff_name,
        email: auth.staffProfile.staff_email,
        phone: auth.staffProfile.staff_phone,
        branch: auth.staffProfile.organization_name,
        role: auth.staffProfile.staff_role,
        department: auth.staffProfile.department,
        approvalStatus: auth.staffProfile.approval_status,
      },
      bookings: mappedBookings,
    },
  });
});

const updateWalkinStatusController = asyncHandler(async (req, res) => {
  const auth = await getAuthenticatedStaff(req, res);
  if (!auth) return;

  const { id, currentStatus } = req.body;

  if (!id || !currentStatus) {
    return res.status(400).json({
      success: false,
      message: "id and currentStatus are required.",
    });
  }

  const nextStatus = WALKIN_NEXT[String(currentStatus).toLowerCase()];
  console.log("Current Status:", currentStatus);
console.log("Next Status:", nextStatus);

  if (!nextStatus) {
    return res.status(400).json({
      success: false,
      message: `No next status for: ${currentStatus}`,
    });
  }

  const updated = await staffModel.updateWalkinStatus(id, nextStatus);

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: "Booking not found.",
    });
  }

  return res.json({
    success: true,
    message: `Status updated to ${nextStatus}`,
    newStatus: nextStatus,
  });
});

const updateScanStatusController = asyncHandler(async (req, res) => {
  const auth = await getAuthenticatedStaff(req, res);
  if (!auth) return;

  const { id, currentStatus } = req.body;

  if (!id || !currentStatus) {
    return res.status(400).json({
      success: false,
      message: "id and currentStatus are required.",
    });
  }

  const nextStatus = SCAN_NEXT[String(currentStatus).toLowerCase()];
  if (!nextStatus) {
    return res.status(400).json({
      success: false,
      message: `No next status for: ${currentStatus}`,
    });
  }

  const updated = await staffModel.updateScanStatus(id, nextStatus);

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: "Scan booking not found.",
    });
  }

  return res.json({
    success: true,
    message: `Status updated to ${nextStatus}`,
    newStatus: nextStatus,
  });
});

const updateHomeServiceStatusController = asyncHandler(async (req, res) => {
  const auth = await getAuthenticatedStaff(req, res);
  if (!auth) return;

  const { id, currentStatus, action } = req.body;

  if (!id || !currentStatus) {
    return res.status(400).json({
      success: false,
      message: "id and currentStatus are required.",
    });
  }

  let nextStatus;

  if (
    String(currentStatus).toLowerCase() === "submitted_to_lab" &&
    action === "reject"
  ) {
    nextStatus = "sample_rejected";
  } else {
    nextStatus = HOME_NEXT[String(currentStatus).toLowerCase()];
  }

  if (!nextStatus) {
    return res.status(400).json({
      success: false,
      message: `No next status for: ${currentStatus}`,
    });
  }

  const updated = await staffModel.updateHomeServiceStatus(id, nextStatus);

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: "Booking not found.",
    });
  }

  return res.json({
    success: true,
    message: `Status updated to ${nextStatus}`,
    newStatus: nextStatus,
  });
});

const uploadReportController = asyncHandler(async (req, res) => {
  const auth = await getAuthenticatedStaff(req, res);
  if (!auth) return;

  const { bookingId, bookingType, fileBase64 } = req.body;

  if (!bookingId || !bookingType || !fileBase64) {
    return res.status(400).json({
      success: false,
      message: "bookingId, bookingType and fileBase64 are required.",
    });
  }

  if (!["home_service", "walkin", "scan"].includes(bookingType)) {
    return res.status(400).json({
      success: false,
      message: "bookingType must be home_service, walkin or scan.",
    });
  }

  const match = fileBase64.match(/^data:([^;]+);base64,(.+)$/);
  const mimeType = match ? match[1] : "application/pdf";
  const base64Data = match ? match[2] : fileBase64;

  if (mimeType !== "application/pdf") {
    return res.status(400).json({
      success: false,
      message: "Only PDF reports are allowed.",
    });
  }

  const filename = `report_${crypto.randomUUID()}.pdf`;
  const uploadDir = path.join(process.cwd(), "uploads", "reports");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(uploadDir, filename),
    Buffer.from(base64Data, "base64")
  );

  const reportPath = `/uploads/reports/${filename}`;

  const reportId = await staffModel.uploadReport(
    bookingId,
    bookingType,
    reportPath,
    auth.userId
  );

  return res.status(201).json({
    success: true,
    message: "Report uploaded successfully.",
    data: {
      reportId,
      reportPath,
    },
  });
});

const getReportsForUserController = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated.",
    });
  }

  const reports = await staffModel.getReportsForUser(userId);

  return res.json({
    success: true,
    data: reports,
  });
});

module.exports = {
  getLabTechnicianDashboard,
  updateWalkinStatusController,
  updateScanStatusController,
  updateHomeServiceStatusController,
  uploadReportController,
  getReportsForUserController,
};