const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../services/auth.service");

const registerController = async (req, res) => {
  // TODO:
  // 1. Extract request body
  // 2. Call register service
  // 3. Return response
};

const loginController = async (req, res) => {
  // TODO:
  // 1. Extract credentials
  // 2. Call login service
  // 3. Set secure cookies
  // 4. Return auth response
};

const logoutController = async (req, res) => {
  // TODO:
  // 1. Read session/auth data
  // 2. Call logout service
  // 3. Clear auth cookies
  // 4. Return response
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
