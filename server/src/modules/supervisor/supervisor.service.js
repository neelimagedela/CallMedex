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
  getPatientReportsList,
  getPhleboList,
  getHomeServiceBooking,
  updateHomeServiceBookingStatus,
  getActiveBookingsForPhlebos,
} = require("./supervisor.model");

const {
  getPhleboWalletSummary,
  getSupervisorPhleboWalletSummary,
} = require("../homeService/models/homeServiceBooking.model");

const BRANCH_ALIASES = {
  madhurawada: "Madhurawada",
  madhurwada: "Madhurawada",

  akkayapalem: "Akkayapalem",
  akkayyapalem: "Akkayapalem",
  akkeyapalem: "Akkayapalem",
  akkeyyapalem: "Akkayapalem",
  akkyapalem: "Akkayapalem",
  akkasayapalem: "Akkayapalem",

  kgh: "KGH",
  "kgh branch": "KGH",
};

const normalizeBranch = (branch) => {
  if (!branch) return null;

  const key = String(branch).toLowerCase().trim();
  return BRANCH_ALIASES[key] || String(branch).trim();
};

const getBranchVariants = (branch) => {
  const canonical = normalizeBranch(branch);
  const variants = new Set();

  if (canonical) {
    variants.add(canonical.toLowerCase().trim());
  }

  Object.entries(BRANCH_ALIASES).forEach(([alias, value]) => {
    if (value === canonical) {
      variants.add(alias.toLowerCase().trim());
    }
  });

  return [...variants];
};

const resolveBranch = async (userId) => {
  const branch = await getSupervisorBranch(userId);

  if (!branch) {
    throw new AppError(
      "Supervisor branch is not configured. Contact admin.",
      403
    );
  }

  return normalizeBranch(branch);
};

const fetchDashboardSummary = async (userId) => {
  const branch = await resolveBranch(userId);
  const variants = getBranchVariants(branch);

  return getDashboardSummary(branch, variants);
};

const fetchStaffList = async (userId, search = "") => {
  const branch = await resolveBranch(userId);
  const variants = getBranchVariants(branch);

  return getStaffList(branch, variants, search);
};

const approveStaff = async (userId, staffProfileId) => {
  const branch = await resolveBranch(userId);
  const variants = getBranchVariants(branch);

  const belongs = await verifyStaffBelongsToBranch(staffProfileId, variants);

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
  const variants = getBranchVariants(branch);

  const belongs = await verifyStaffBelongsToBranch(staffProfileId, variants);

  if (!belongs) {
    throw new AppError("Staff member not found in your organization", 404);
  }

  const affected = await updateStaffApprovalStatus(staffProfileId, "rejected");

  if (!affected) {
    throw new AppError("Failed to update staff status", 500);
  }

  return { message: "Staff rejected successfully" };
};

const fetchPatientsAndAppointments = async (userId, search = "") => {
  const branch = await resolveBranch(userId);
  const variants = getBranchVariants(branch);

  const data = await getPatientsAndAppointments(branch, variants, search);

  console.log("SUPERVISOR USER ID:", userId);
  console.log("SUPERVISOR BRANCH:", branch);
  console.log("BRANCH VARIANTS:", variants);
  console.log("PATIENT APPOINTMENTS COUNT:", data.length);

  return data;
};

const fetchPatientReportsList = async (userId, type = "all") => {
  const branch = await resolveBranch(userId);
  const variants = getBranchVariants(branch);

  return getPatientReportsList(branch, variants, type);
};

const parseTimeToDecimal = (timeStr) => {
  if (!timeStr) return null;

  const match = String(timeStr).match(/^(\d+):(\d+)\s*(AM|PM)?/i);

  if (!match) {
    const hourMatch = String(timeStr).match(/^(\d+)\s*(AM|PM)?/i);

    if (!hourMatch) return null;

    let hour = Number(hourMatch[1]);
    const meridiem = hourMatch[2];

    if (meridiem) {
      const med = meridiem.toUpperCase();

      if (med === "PM" && hour !== 12) hour += 12;
      if (med === "AM" && hour === 12) hour = 0;
    }

    return hour;
  }

  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const meridiem = match[3];

  if (meridiem) {
    const med = meridiem.toUpperCase();

    if (med === "PM" && hour !== 12) hour += 12;
    if (med === "AM" && hour === 12) hour = 0;
  }

  return hour + minute / 60;
};

const parseAvailableDays = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const isCurrentTimeInShift = (phlebo, currentDay, currentDecimalTime) => {
  if (phlebo.phlebo_type === "partTime") {
    const days = parseAvailableDays(phlebo.available_days);

    if (!days.includes(currentDay)) {
      return false;
    }
  }

  const morningStart = parseTimeToDecimal(phlebo.morning_start);
  const morningEnd = parseTimeToDecimal(phlebo.morning_end);
  const eveningStart = parseTimeToDecimal(phlebo.evening_start);
  const eveningEnd = parseTimeToDecimal(phlebo.evening_end);

  if (morningStart !== null && morningEnd !== null) {
    if (
      currentDecimalTime >= morningStart &&
      currentDecimalTime <= morningEnd
    ) {
      return true;
    }
  }

  if (eveningStart !== null && eveningEnd !== null) {
    if (
      currentDecimalTime >= eveningStart &&
      currentDecimalTime <= eveningEnd
    ) {
      return true;
    }
  }

  return false;
};

const fetchPhleboList = async (userId, statusFilter = "", search = "") => {
  const branch = await resolveBranch(userId);
  const variants = getBranchVariants(branch);

  const phlebos = await getPhleboList(branch, variants, search);
  const activeBookings = await getActiveBookingsForPhlebos();

  const activeBookingMap = new Map();

  activeBookings.forEach((booking) => {
    activeBookingMap.set(booking.phleboId, booking);
  });

  const now = new Date();
  const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });
  const currentDecimalTime = now.getHours() + now.getMinutes() / 60;

  const results = phlebos.map((p) => {
    const isActive = isCurrentTimeInShift(
      p,
      currentDay,
      currentDecimalTime
    );

    const activeBooking = activeBookingMap.get(p.userId) || null;

    return {
      profileId: p.profileId,
      userId: p.userId,
      name: p.name,
      email: p.email,
      phone: p.phone,
      phleboType: p.phlebo_type || "fullTime",
      shiftTiming: `${p.morning_start || "—"} - ${
        p.morning_end || "—"
      } / ${p.evening_start || "—"} - ${p.evening_end || "—"}`,
      isActive: isActive ? "Active" : "Inactive",
      isEngaged: Boolean(activeBooking),
      activeBooking,
      lastUpdated: p.lastUpdated,
      assignedCount: p.assignedCount,
      completedCount: p.completedCount,
      qualification: p.qualification || "—",
      certificationNumber: p.certification_number || "—",
      createdAt: p.created_at,
    };
  });

  if (statusFilter === "active") {
    return results.filter((item) => item.isActive === "Active");
  }

  if (statusFilter === "inactive") {
    return results.filter((item) => item.isActive === "Inactive");
  }

  return results;
};

const fetchPhleboWallet = async (userId, phleboUserId) => {
  const branch = await resolveBranch(userId);
  const variants = getBranchVariants(branch);

  return getSupervisorPhleboWalletSummary(
    phleboUserId,
    variants
  );
};

const fetchHomeServiceBooking = async (userId, bookingId) => {
  const branch = await resolveBranch(userId);
  const variants = getBranchVariants(branch);

  return getHomeServiceBooking(bookingId, variants);
};

const patchHomeServiceBookingStatus = async (userId, id, status) => {
  const branch = await resolveBranch(userId);
  const variants = getBranchVariants(branch);

  const updated = await updateHomeServiceBookingStatus(id, status, variants);

  if (!updated) {
    throw new AppError("Failed to update status, booking not found", 404);
  }

  return { message: "Status updated successfully" };
};

const fetchOrganizationProfile = async (userId) => {
  const profile = await getOrganizationProfile(userId);

  if (!profile) {
    throw new AppError("Organization profile not found", 404);
  }

  return profile;
};

const patchOrganizationProfile = async (userId, fields) => {
  await resolveBranch(userId);

  const affected = await updateOrganizationProfile(userId, fields);

  if (!affected) {
    throw new AppError("Organization profile not found or nothing changed", 404);
  }

  return { message: "Organization profile updated successfully" };
};

const fetchReports = async (userId) => {
  const branch = await resolveBranch(userId);
  const variants = getBranchVariants(branch);

  return getReportCounts(branch, variants);
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
  fetchPatientReportsList,
  fetchPhleboList,
  fetchPhleboWallet,
  fetchHomeServiceBooking,
  patchHomeServiceBookingStatus,
};