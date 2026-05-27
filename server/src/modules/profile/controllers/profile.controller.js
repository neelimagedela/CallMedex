const asyncHandler = require("../../../shared/utils/asyncHandler");
const { successResponse } = require("../../../shared/utils/response");
const { upsertProfile, findProfileByUserId } = require("../models/profile.model");
const AppError = require("../../../shared/utils/AppError");

const onboardProfileController = asyncHandler(async (req, res) => {
  // If req.user is set (from JWT verification) we use it, otherwise check req.body.userId for flexibility during initial register-onboard flow
  const userId = req.user?.id || req.body.userId;
  const role = req.user?.role || req.body.role;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  if (!role) {
    throw new AppError("User role is required", 400);
  }

  // Filter out meta parameters from profile data
  const { userId: bodyUserId, role: bodyRole, ...profileData } = req.body;

  await upsertProfile(userId, role, profileData);

  return successResponse({
    res,
    status: 200,
    message: "Profile onboarded successfully",
    data: {
      userId,
      role,
      registrationStatus: "PROFILE_COMPLETED"
    }
  });
});

const getProfileController = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const role = req.user?.role;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  const profile = await findProfileByUserId(userId, role);

  return successResponse({
    res,
    status: 200,
    message: "Profile retrieved successfully",
    data: profile
  });
});

module.exports = {
  onboardProfileController,
  getProfileController
};
