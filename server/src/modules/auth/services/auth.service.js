const AppError = require("../../../shared/utils/AppError");

const {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
  sanitizeInput,
} = require("./validation.service");

const {
  hashPassword,
  comparePassword,
} = require("./password.service");

const {
  generateOtp,
  hashOtp,
  compareOtp,
  sendEmailOtp,
  sendPhoneOtp,
} = require("./otp.service");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("./token.service");

const {
  generatePublicUserId,
} = require("./publicId.service");

const {
  createUser,
  findUserByEmail,
  findUserByEmailOrPhone,
  findUserById,
  updatePhoneVerification,
  completeEmailVerification,
} = require("../models/user.model");

const {
  createOtp,
  findLatestOtp,
  findLatestOtpAny,
  markOtpUsed,
} = require("../models/otp.model");

const {
  createSession,
  revokeSession,
} = require("../models/session.model");

const registerUser = async (userData) => {

  registerSchema.parse(userData);

  const sanitizedData = sanitizeInput(userData);

  const existingUser = await findUserByEmailOrPhone(
    sanitizedData.email,
    sanitizedData.phone
  );

  if (existingUser) {

    if (existingUser.registration_status !== "PROFILE_COMPLETED") {

      if (!existingUser.is_email_verified) {

        await sendOtp({
          userId: existingUser.id,
          type: "email",
          target: existingUser.email,
          name: existingUser.name,
        });
      }

      return {
        success: true,
        message: existingUser.is_email_verified
          ? "Resume registration"
          : "Resume registration. OTP resent to email.",

        data: {
          userId: existingUser.id,
          publicUserId: existingUser.public_user_id,
          registrationStatus: existingUser.registration_status,
          isEmailVerified: existingUser.is_email_verified,
          isPhoneVerified: existingUser.is_phone_verified,
          nextStep: existingUser.is_email_verified ? "LOGIN" : "VERIFY_EMAIL",
        },
      };
    }

    throw new AppError("User already exists", 409);
  }

  const passwordHash = await hashPassword(sanitizedData.password);

  const user = await createUser({
    ...sanitizedData,
    password_hash: passwordHash,
  });

  await sendOtp({
    userId: user.id,
    type: "email",
    target: user.email,
    name: user.name,
  });

  return {
    success: true,
    message: "Registration initiated. OTP sent to email.",

    data: {
      userId: user.id,
      publicUserId: null,
      registrationStatus: "PENDING_VERIFICATION",
      nextStep: "VERIFY_EMAIL",
    },
  };
};

const sendOtp = async ({ userId, type, target, name }) => {

  const otp = generateOtp();
  const otpHash = await hashOtp(otp);

  // Invalidate any existing unused OTP regardless of expiry
  const existingOtp = await findLatestOtpAny({ userId, type });

  if (existingOtp) {
    await markOtpUsed(existingOtp.id);
  }

  await createOtp({ userId, otpHash, type });

  if (type === "email") {
    await sendEmailOtp(target, otp, name);
  }

  if (type === "phone") {
    await sendPhoneOtp(target, otp);
  }

  return {
    success: true,
    message: `${type} OTP sent`,
  };
};

const verifyOtp = async (data) => {

  verifyOtpSchema.parse(data);

  // findLatestOtp already filters by is_used = FALSE AND expires_at > NOW()
  const otpRecord = await findLatestOtp({
    userId: data.userId,
    type: data.type,
  });

  if (!otpRecord) {
    // Could be not found OR expired — give a generic message to avoid information leakage
    throw new AppError("OTP is invalid or has expired. Please request a new one.", 400);
  }

  const otpMatches = await compareOtp(data.otp, otpRecord.otp_hash);

  if (!otpMatches) {
    throw new AppError("Invalid OTP", 400);
  }

  const user = await findUserById(data.userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  let publicUserId = user.public_user_id;

  if (!publicUserId) {
    publicUserId = generatePublicUserId(user.role, user.id);
  }

  if (data.type === "email") {
    await completeEmailVerification(user.id, publicUserId);
  }

  if (data.type === "phone") {
    await updatePhoneVerification(user.id);
  }

  await markOtpUsed(otpRecord.id);

  return {
    success: true,
    message: `${data.type} verified successfully`,

    data: {
      userId: user.id,
      publicUserId,
      registrationStatus: "VERIFIED",
      nextStep: "LOGIN",
    },
  };
};

const loginUser = async (credentials, req) => {

  loginSchema.parse(credentials);

  const sanitizedData = sanitizeInput(credentials);

  const user = await findUserByEmail(sanitizedData.email);

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatches = await comparePassword(
    sanitizedData.password,
    user.password_hash
  );

  if (!passwordMatches) {
    throw new AppError("Invalid credentials", 401);
  }

  if (
    !user.is_email_verified ||
    user.registration_status === "PENDING_VERIFICATION"
  ) {
    return {
      success: false,
      requiresVerification: true,
      message: "Complete email verification first",

      data: {
        userId: user.id,
        publicUserId: user.public_user_id,
        nextStep: "VERIFY_EMAIL",
      },
    };
  }

  const accessToken = generateAccessToken({
    id: user.id,
    publicUserId: user.public_user_id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({ id: user.id });

  const session = await createSession({
    userId: user.id,
    refreshToken,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  return {
    success: true,
    message: "Login successful",

    data: {
      accessToken,
      refreshToken,
      sessionId: session.id,

      user: {
        id: user.public_user_id,
        internalId: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
      },

      nextStep:
        user.registration_status === "VERIFIED"
          ? "ROLE_ONBOARDING"
          : "DASHBOARD",
    },
  };
};

const logoutUser = async (sessionId) => {

  await revokeSession(sessionId);

  return {
    success: true,
    message: "Logout successful",
  };
};

module.exports = {
  registerUser,
  sendOtp,
  verifyOtp,
  loginUser,
  logoutUser,
};