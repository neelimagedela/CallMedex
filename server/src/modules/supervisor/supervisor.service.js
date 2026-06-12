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

const fetchPhleboList = async (userId, statusFilter = "", search = "") => {
  const branch = await resolveBranch(userId);
  const phlebos = await getPhleboList(branch, search);
  const todayBookings = await getTodayPhleboBookings(branch);

  // Compute current slot window based on current local time
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeDecimal = currentHour + currentMinute / 60;

  let currentSlot = null; // 'morning', 'evening' or null
  if (currentTimeDecimal >= 6 && currentTimeDecimal <= 12) {
    currentSlot = "morning";
  } else if (currentTimeDecimal > 12 && currentTimeDecimal <= 20) {
    currentSlot = "evening";
  }

  const parseSlotToHour = (slotStr) => {
    if (!slotStr) return null;
    const match = slotStr.match(/^(\d+)\s*(AM|PM)?/i);
    if (!match) return null;
    let hour = parseInt(match[1], 10);
    let meridiem = match[2];
    
    if (!meridiem) {
      const endMatch = slotStr.match(/(AM|PM)/i);
      if (endMatch) {
        meridiem = endMatch[1];
      }
    }
    
    if (meridiem) {
      const med = meridiem.toUpperCase();
      if (med === "PM" && hour !== 12) {
        hour += 12;
      } else if (med === "AM" && hour === 12) {
        hour = 0;
      }
    }
    return hour;
  };

  const matchesCurrentSlot = (slotStr) => {
    if (!currentSlot) return false;
    const hour = parseSlotToHour(slotStr);
    if (hour === null) return false;
    if (currentSlot === "morning") {
      return hour >= 6 && hour < 12;
    }
    if (currentSlot === "evening") {
      return hour >= 12 && hour < 20;
    }
    return false;
  };

  const activePhleboIds = new Set();
  todayBookings.forEach((booking) => {
    if (booking.phleboId && matchesCurrentSlot(booking.timeSlot)) {
      activePhleboIds.add(booking.phleboId);
    }
  });

  const results = phlebos.map((p) => {
    const isActive = activePhleboIds.has(p.userId);
    return {
      profileId: p.profileId,
      userId: p.userId,
      name: p.name,
      email: p.email,
      isActive: isActive ? "Active" : "Inactive",
      lastUpdated: p.lastUpdated,
      assignedCount: p.assignedCount,
      completedCount: p.completedCount,
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

const fetchHomeServiceBooking = async (userId, bookingId) => {
  const branch = await resolveBranch(userId);
  return getHomeServiceBooking(bookingId);
};

const patchHomeServiceBookingStatus = async (userId, id, status) => {
  const branch = await resolveBranch(userId);
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
  fetchPhleboList,
  fetchHomeServiceBooking,
  patchHomeServiceBookingStatus,
};
