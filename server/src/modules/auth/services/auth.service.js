const {
  validateRegistrationInput,
  validateLoginInput,
  sanitizeInput,
} = require("./validation.service");

const {
  hashPassword,
  comparePassword,
} = require("./password.service");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("./token.service");

const {
  createSession,
  invalidateSession,
} = require("./session.service");

const {
  generateOtp,
  sendPhoneOtp,
} = require("./otp.service");

const registerUser = async (userData) => {
  // TODO:
  // 1. Validate registration input
  // 2. Sanitize user input
  // 3. Check existing user
  // 4. Hash password
  // 5. Create base user
  // 6. Generate OTP
  // 7. Send OTP
  // 8. Handle role-specific onboarding
  // 9. Return registration response
};

const loginUser = async (credentials) => {
  // TODO:
  // 1. Validate login input
  // 2. Find user
  // 3. Compare password
  // 4. Check verification status
  // 5. Generate access token
  // 6. Generate refresh token
  // 7. Create session
  // 8. Return auth payload
};

const logoutUser = async (sessionData) => {
  // TODO:
  // 1. Invalidate refresh token
  // 2. Invalidate session
  // 3. Return logout response
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
