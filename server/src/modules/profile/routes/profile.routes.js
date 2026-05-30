const express = require("express");

const {
  onboardProfileController,
  getProfileController,
} = require("../controllers/profile.controller");

const { authenticate } = require("../../auth/middleware/auth.middleware");

const router = express.Router();

// During registration, user is not logged in yet.
// So onboarding should use userId from request body.
router.post("/onboard", onboardProfileController);

// Logged-in profile routes
router.get("/", authenticate, getProfileController);

module.exports = router;