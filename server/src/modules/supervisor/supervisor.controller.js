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
} = require("./supervisor.service");

// GET /api/supervisor/dashboard
const getDashboard = asyncHandler(async (req, res) => {
  const data = await fetchDashboardSummary(req.user.id);
  return successResponse({ res, message: "Dashboard summary fetched", data });
});

// GET /api/supervisor/staff
const getStaff = asyncHandler(async (req, res) => {
  const data = await fetchStaffList(req.user.id);
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
  const data = await fetchPatientsAndAppointments(req.user.id);
  return successResponse({ res, message: "Patients & appointments fetched", data });
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
};
