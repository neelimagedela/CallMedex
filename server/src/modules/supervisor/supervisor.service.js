const AppError = require("../../shared/utils/AppError");
const {
  getSupervisorBranch,
  getDashboardSummary,
  getStaffList,
  updateStaffApprovalStatus,
  verifyStaffBelongsToBranch,
  getPatientsAndAppointments,
  getOrganizationProfile,
  updateOrganizationProfile,
  getReportCounts,
} = require("./supervisor.model");

/**
 * Resolve and validate the supervisor's branch from DB.
 * Throws 403 if the account has no branch assigned yet.
 */
const resolveBranch = async (userId) => {
  const branch = await getSupervisorBranch(userId);
  if (!branch) {
    throw new AppError(
      "Supervisor branch is not configured. Contact admin.",
      403
    );
  }
  return branch;
};

const fetchDashboardSummary = async (userId) => {
  const branch = await resolveBranch(userId);
  return getDashboardSummary(branch);
};

const fetchStaffList = async (userId) => {
  const branch = await resolveBranch(userId);
  return getStaffList(branch);
};

const approveStaff = async (userId, staffProfileId) => {
  const branch = await resolveBranch(userId);

  // Security: confirm the staff row belongs to this supervisor's branch
  const belongs = await verifyStaffBelongsToBranch(staffProfileId, branch);
  if (!belongs) {
    throw new AppError("Staff member not found in your organization", 404);
  }

  const affected = await updateStaffApprovalStatus(staffProfileId, "approved");
  if (!affected) {
    throw new AppError("Failed to update staff status", 500);
  }

  return { message: "Staff approved successfully" };
};

const rejectStaff = async (userId, staffProfileId) => {
  const branch = await resolveBranch(userId);

  const belongs = await verifyStaffBelongsToBranch(staffProfileId, branch);
  if (!belongs) {
    throw new AppError("Staff member not found in your organization", 404);
  }

  const affected = await updateStaffApprovalStatus(staffProfileId, "rejected");
  if (!affected) {
    throw new AppError("Failed to update staff status", 500);
  }

  return { message: "Staff rejected successfully" };
};

const fetchPatientsAndAppointments = async (userId) => {
  const branch = await resolveBranch(userId);
  return getPatientsAndAppointments(branch);
};

const fetchOrganizationProfile = async (userId) => {
  const profile = await getOrganizationProfile(userId);

  if (!profile) {
    throw new AppError("Organization profile not found", 404);
  }

  return profile;
};

const patchOrganizationProfile = async (userId, fields) => {
  const affected = await updateOrganizationProfile(branch, fields);
  if (!affected) {
    throw new AppError("Organization profile not found or nothing changed", 404);
  }
  return { message: "Organization profile updated successfully" };
};

const fetchReports = async (userId) => {
  const branch = await resolveBranch(userId);
  return getReportCounts(branch);
};

module.exports = {
  fetchDashboardSummary,
  fetchStaffList,
  approveStaff,
  rejectStaff,
  fetchPatientsAndAppointments,
  fetchOrganizationProfile,
  patchOrganizationProfile,
  fetchReports,
};
