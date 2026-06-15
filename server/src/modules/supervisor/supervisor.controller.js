const asyncHandler = require("../../shared/utils/asyncHandler");
const { successResponse } = require("../../shared/utils/response");
const AppError = require("../../shared/utils/AppError");

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

const getDashboard = asyncHandler(async (req, res) => {
  const data = await fetchDashboardSummary(req.user.id);

  return successResponse({
    res,
    message: "Dashboard summary fetched",
    data,
  });
});

const getStaff = asyncHandler(async (req, res) => {
  const search = req.query.search || "";
  const data = await fetchStaffList(req.user.id, search);

  return successResponse({
    res,
    message: "Staff list fetched",
    data,
  });
});

const approveStaffHandler = asyncHandler(async (req, res) => {
  const staffProfileId = Number(req.params.id);

  if (!staffProfileId) {
    throw new AppError("Invalid staff profile id", 400);
  }

  const data = await approveStaff(req.user.id, staffProfileId);

  return successResponse({
    res,
    message: data.message,
  });
});

const rejectStaffHandler = asyncHandler(async (req, res) => {
  const staffProfileId = Number(req.params.id);

  if (!staffProfileId) {
    throw new AppError("Invalid staff profile id", 400);
  }

  const data = await rejectStaff(req.user.id, staffProfileId);

  return successResponse({
    res,
    message: data.message,
  });
});

const getPatients = asyncHandler(async (req, res) => {
  const search = req.query.search || "";
  const data = await fetchPatientsAndAppointments(req.user.id, search);

  return successResponse({
    res,
    message: "Patients and appointments fetched",
    data,
  });
});

const getPhlebos = asyncHandler(async (req, res) => {
  const status = req.query.status || "";
  const search = req.query.search || "";

  const data = await fetchPhleboList(req.user.id, status, search);

  return successResponse({
    res,
    message: "Phlebotomists list fetched",
    data,
  });
});

const getPhlebosWallet = asyncHandler(async (req, res) => {
  const phleboUserId = Number(req.params.phleboUserId);

  if (!phleboUserId) {
    throw new AppError("Invalid phlebo user id", 400);
  }

  const data = await fetchPhleboWallet(req.user.id, phleboUserId);

  return successResponse({
    res,
    message: "Phlebo wallet retrieved successfully",
    data,
  });
});

const updatePhleboBookingStatus = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  if (!bookingId) {
    throw new AppError("Booking id is required", 400);
  }

  if (!status) {
    throw new AppError("Status is required", 400);
  }

  const booking = await fetchHomeServiceBooking(req.user.id, bookingId);

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  const data = await patchHomeServiceBookingStatus(
    req.user.id,
    booking.id,
    status
  );

  return successResponse({
    res,
    message: data.message,
  });
});

const getOrgProfile = asyncHandler(async (req, res) => {
  const data = await fetchOrganizationProfile(req.user.id);

  return successResponse({
    res,
    message: "Organization profile fetched",
    data,
  });
});

const updateOrgProfile = asyncHandler(async (req, res) => {
  const data = await patchOrganizationProfile(req.user.id, req.body);

  return successResponse({
    res,
    message: data.message,
  });
});

const getReports = asyncHandler(async (req, res) => {
  const data = await fetchReports(req.user.id);

  return successResponse({
    res,
    message: "Reports fetched",
    data,
  });
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