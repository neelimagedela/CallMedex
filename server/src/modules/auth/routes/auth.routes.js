const express = require("express");

const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/auth.controller");

const router = express.Router();

// Register User
router.post("/register", registerController);

// Login User
router.post("/login", loginController);

// Logout User
router.post("/logout", logoutController);

module.exports = router;
