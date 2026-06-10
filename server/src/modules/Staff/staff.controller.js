const asyncHandler = require("../../shared/utils/asyncHandler");
const staffModel = require("./staff.model");

const mapLabStatus = (status = "") => {
  const value = String(status).toLowerCase();
  if (["pending", "confirmed", "assigned", "accepted"].includes(value)) return "samples";
  if (["sample_received", "submitted_to_lab"].includes(value)) return "sample_received";
  if (["processing", "report_ready"].includes(value)) return "reports_ready";
  if (value === "completed") return "completed";
  return "samples";
};

const getLabTechnicianDashboard = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?.userId;

  if (!userId) {
    return res.status(401).json({ success: false, message: "User not found in token. Please login again." });
  }

  const staffProfile = await staffModel.getStaffProfileByUserId(userId);

  if (!staffProfile) {
    return res.status(404).json({ success: false, message: "Staff profile not found for this user." });
  }

  const role = staffProfile.staff_role?.toLowerCase().trim();
  if (role !== "lab technician" && role !== "lab_technician") {
    return res.status(403).json({ success: false, message: "Only Lab Technician staff can access this dashboard." });
  }

  const bookings = await staffModel.getBranchLabBookings(staffProfile.organization_name);

  const mappedBookings = bookings.map((booking) => ({
    ...booking,
    labStatus: mapLabStatus(booking.status),
  }));

  return res.json({
    success: true,
    data: {
      branch: staffProfile.organization_name,
      staffRole: staffProfile.staff_role,
      department: staffProfile.department,
      bookings: mappedBookings,
    },
  });
});

const NEXT_STATUS = {
  pending:        "sample_received",
  confirmed:      "sample_received",
  sample_received: "report_ready",
  report_ready:   "completed",
};

const updateWalkinStatusController = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?.userId;

  if (!userId) {
    return res.status(401).json({ success: false, message: "User not found in token." });
  }

  const staffProfile = await staffModel.getStaffProfileByUserId(userId);
  if (!staffProfile) {
    return res.status(404).json({ success: false, message: "Staff profile not found." });
  }

  const role = staffProfile.staff_role?.toLowerCase().trim();
  if (role !== "lab technician" && role !== "lab_technician") {
    return res.status(403).json({ success: false, message: "Not authorized." });
  }

  const { id, currentStatus } = req.body;

  if (!id || !currentStatus) {
    return res.status(400).json({ success: false, message: "id and currentStatus are required." });
  }

  const nextStatus = NEXT_STATUS[currentStatus.toLowerCase()];
  if (!nextStatus) {
    return res.status(400).json({ success: false, message: `No next status for: ${currentStatus}` });
  }

  const updated = await staffModel.updateWalkinStatus(id, nextStatus);
  if (!updated) {
    return res.status(404).json({ success: false, message: "Booking not found or not updated." });
  }

  return res.json({ success: true, message: `Status updated to ${nextStatus}`, newStatus: nextStatus });
});

module.exports = {
  getLabTechnicianDashboard,
  updateWalkinStatusController,
};