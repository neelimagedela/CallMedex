const asyncHandler = require("../../shared/utils/asyncHandler");
const { successResponse } = require("../../shared/utils/response");
const {
  fetchDashboardSummary,
  fetchStaffList,
  approveStaff,
  rejectStaff,
  fetchPatientsAndAppointments,
  fetchOrganizationProfile,
  patchOrganizationProfile,
  fetchReports,
  fetchPhleboList,
  fetchPhleboWallet,
  fetchHomeServiceBooking,
  patchHomeServiceBookingStatus,
} = require("./supervisor.service");

// GET /api/supervisor/dashboard
const getDashboard = asyncHandler(async (req, res) => {
  const data = await fetchDashboardSummary(req.user.id);
  return successResponse({ res, message: "Dashboard summary fetched", data });
});

// GET /api/supervisor/staff
const getStaff = asyncHandler(async (req, res) => {
  const search = req.query.search || "";
  const data = await fetchStaffList(req.user.id, search);
  return successResponse({ res, message: "Staff list fetched", data });
});

// PUT /api/supervisor/staff/:id/approve
const approveStaffHandler = asyncHandler(async (req, res) => {
  const staffProfileId = Number(req.params.id);
  const data = await approveStaff(req.user.id, staffProfileId);
  return successResponse({ res, message: data.message });
});

// PUT /api/supervisor/staff/:id/reject
const rejectStaffHandler = asyncHandler(async (req, res) => {
  const staffProfileId = Number(req.params.id);
  const data = await rejectStaff(req.user.id, staffProfileId);
  return successResponse({ res, message: data.message });
});

// GET /api/supervisor/patients
const getPatients = asyncHandler(async (req, res) => {
  const search = req.query.search || "";
  const data = await fetchPatientsAndAppointments(req.user.id, search);
  return successResponse({ res, message: "Patients & appointments fetched", data });
});

// GET /api/supervisor/phlebos
const getPhlebos = asyncHandler(async (req, res) => {
  const status = req.query.status || "";
  const search = req.query.search || "";
  const data = await fetchPhleboList(req.user.id, status, search);
  return successResponse({ res, message: "Phlebotomists list fetched", data });
});

// GET /api/supervisor/phlebos/:phleboUserId/wallet
const getPhlebosWallet = asyncHandler(async (req, res) => {
  const { phleboUserId } = req.params;
  const data = await fetchPhleboWallet(req.user.id, Number(phleboUserId));
  return successResponse({ res, message: "Phlebo wallet retrieved successfully", data });
});

// PATCH /api/supervisor/phlebo-bookings/:bookingId/status
const updatePhleboBookingStatus = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const booking = await fetchHomeServiceBooking(req.user.id, bookingId);
  if (!booking) {
    return res.status(404).json({ error: "Booking not found." });
  }

  const NEXT = { pending:'accepted', accepted:'sample_collected', sample_collected:'submitted_to_lab',
    submitted_to_lab:'received_by_lab', received_by_lab:'report_ready', report_ready:'completed', completed:null };

  if (req.body.status !== NEXT[booking.status])
    return res.status(400).json({ error: `Only "${NEXT[booking.status]}" allowed next.` });

  const result = await patchHomeServiceBookingStatus(req.user.id, booking.id, req.body.status);
  return successResponse({ res, message: "Booking status updated successfully", data: result });
});

// GET /api/supervisor/profile
const getOrgProfile = asyncHandler(async (req, res) => {
  const data = await fetchOrganizationProfile(req.user.id);
  return successResponse({ res, message: "Organization profile fetched", data });
});

// PUT /api/supervisor/profile
const updateOrgProfile = asyncHandler(async (req, res) => {
  // Only allow known update fields through — no mass assignment
  const { institutionName, licenseNumber, headOfInstitution, contactDetails } =
    req.body;

  const data = await patchOrganizationProfile(req.user.id, {
    institutionName,
    licenseNumber,
    headOfInstitution,
    contactDetails,
  });
  return successResponse({ res, message: data.message });
});

// GET /api/supervisor/reports
const getReports = asyncHandler(async (req, res) => {
  const data = await fetchReports(req.user.id);
  return successResponse({ res, message: "Reports fetched", data });
});

module.exports = {
  getDashboard,
  getStaff,
  approveStaffHandler,
  rejectStaffHandler,
  getPatients,
  getOrgProfile,
  updateOrgProfile,
  getReports,
  getPhlebos,
  getPhlebosWallet,
  updatePhleboBookingStatus,
};
