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
  getPhleboList,
  getTodayPhleboBookings,
  getHomeServiceBooking,
  updateHomeServiceBookingStatus,
  getActiveBookingsForPhlebos,
} = require("./supervisor.model");

const {
  getPhleboWalletSummary,
} = require("../homeService/models/homeServiceBooking.model");

/**
 * Resolve and validate the supervisor's branch from DB.
 * Throws 403 if the account has no branch assigned yet.
 */
const resolveBranch = async (userId) => {
  const organization = await getOrganizationProfile(userId);

  if (!organization) {
    throw new AppError("Organization profile not found", 403);
  }

  return organization.institution_name;
};

const fetchDashboardSummary = async (userId) => {
  const branch = await resolveBranch(userId);
  return getDashboardSummary(branch);
};

const fetchStaffList = async (userId, search = "") => {
  const branch = await resolveBranch(userId);
  return getStaffList(branch, search);
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

const fetchPatientsAndAppointments = async (userId, search = "") => {
  const branch = await resolveBranch(userId);
  return getPatientsAndAppointments(branch, search);
};

const parseTimeToDecimal = (timeStr) => {
  if (!timeStr) return null;
  const match = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)?/i);
  if (!match) {
    const hrMatch = timeStr.match(/^(\d+)\s*(AM|PM)?/i);
    if (!hrMatch) return null;
    let hour = parseInt(hrMatch[1], 10);
    let meridiem = hrMatch[2];
    if (meridiem) {
      const med = meridiem.toUpperCase();
      if (med === "PM" && hour !== 12) hour += 12;
      else if (med === "AM" && hour === 12) hour = 0;
    }
    return hour;
  }
  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  let meridiem = match[3];

  if (meridiem) {
    const med = meridiem.toUpperCase();
    if (med === "PM" && hour !== 12) {
      hour += 12;
    } else if (med === "AM" && hour === 12) {
      hour = 0;
    }
  }
  return hour + minute / 60;
};

const isCurrentTimeInShift = (p, currentDayStr, currentDecimalTime) => {
  if (p.phlebo_type === "partTime") {
    let days = p.available_days;
    if (typeof days === "string") {
      try {
        days = JSON.parse(days);
      } catch {
        days = [];
      }
    }
    if (!Array.isArray(days) || !days.includes(currentDayStr)) {
      return false;
    }
  }

  const mStart = parseTimeToDecimal(p.morning_start);
  const mEnd = parseTimeToDecimal(p.morning_end);
  const eStart = parseTimeToDecimal(p.evening_start);
  const eEnd = parseTimeToDecimal(p.evening_end);

  if (mStart !== null && mEnd !== null) {
    if (currentDecimalTime >= mStart && currentDecimalTime <= mEnd) {
      return true;
    }
  }

  if (eStart !== null && eEnd !== null) {
  if (eStart <= eEnd) {
    if (
      currentDecimalTime >= eStart &&
      currentDecimalTime <= eEnd
    ) {
      return true;
    }
  } else {
    if (
      currentDecimalTime >= eStart ||
      currentDecimalTime <= eEnd
    ) {
      return true;
    }
  }
}

  return false;
};

const fetchPhleboList = async (userId, statusFilter = "", search = "") => {
  const branch = await resolveBranch(userId);
  const phlebos = await getPhleboList(branch, search);
  const activeBookings = await getActiveBookingsForPhlebos();

  // Map active bookings by phlebo ID for easy lookup
  const phleboActiveBookingsMap = new Map();
  activeBookings.forEach((b) => {
    phleboActiveBookingsMap.set(b.phleboId, b);
  });

  const now = new Date();
  const dayOfWeek = now.toLocaleDateString("en-US", { weekday: "long" });
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeDecimal = currentHour + currentMinute / 60;

  const results = phlebos.map((p) => {
    const isActive = isCurrentTimeInShift(p, dayOfWeek, currentTimeDecimal);
    
    const activeBooking = phleboActiveBookingsMap.get(p.userId) || null;
    console.log({
  name: p.name,
  phlebo_type: p.phlebo_type,
  available_days: p.available_days,
  morning_start: p.morning_start,
  morning_end: p.morning_end,
  evening_start: p.evening_start,
  evening_end: p.evening_end,
  dayOfWeek,
  currentTimeDecimal,
  isActive
});
    return {
      profileId: p.profileId,
      userId: p.userId,
      name: p.name,
      email: p.email,
      phone: p.phone,
      phleboType: p.phlebo_type || "fullTime",
      shiftTiming: `${p.morning_start || "—"} - ${p.morning_end || "—"} / ${p.evening_start || "—"} - ${p.evening_end || "—"}`,
      isActive: isActive ? "Active" : "Inactive",
      isEngaged: !!activeBooking,
      activeBooking: activeBooking,
      lastUpdated: p.lastUpdated,
      assignedCount: p.assignedCount,
      completedCount: p.completedCount,
      qualification: p.qualification || "—",
      certificationNumber: p.certification_number || "—",
      createdAt: p.created_at,
    };
  });

  if (statusFilter === "active") {
    return results.filter((r) => r.isActive === "Active");
  }
  if (statusFilter === "inactive") {
    return results.filter((r) => r.isActive === "Inactive");
  }
  return results;
};

const fetchPhleboWallet = async (userId, phleboUserId) => {
  await resolveBranch(userId); // Check permission
  return getPhleboWalletSummary(phleboUserId);
};

const fetchHomeServiceBooking = async (userId, bookingId) => {
  await resolveBranch(userId);
  return getHomeServiceBooking(bookingId);
};

const patchHomeServiceBookingStatus = async (userId, id, status) => {
  await resolveBranch(userId);
  const updated = await updateHomeServiceBookingStatus(id, status);
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
  fetchPhleboList,
  fetchPhleboWallet,
  fetchHomeServiceBooking,
  patchHomeServiceBookingStatus,
};
