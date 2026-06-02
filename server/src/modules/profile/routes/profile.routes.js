const express = require("express");

const {
  onboardProfileController,
  getProfileController,
  getPatientProfileController,
  updatePatientProfileController,
  getPatientBookingsController,
} = require("../controllers/profile.controller");

const { authenticate } = require("../../auth/middleware/auth.middleware");

const router = express.Router();

/*
  Registration onboarding route

  This route is used immediately after OTP verification.
  At that time, user is not logged in yet, so it should not require JWT.
*/
router.post("/onboard", onboardProfileController);

/*
  Patient-only full profile routes

  GET  /api/profile/patient  -> fetch users + patient_profiles data
  PUT  /api/profile/patient  -> update users + patient_profiles data
*/
router.get("/patient", authenticate, getPatientProfileController);

router.put("/patient", authenticate, updatePatientProfileController);
router.get("/bookings", authenticate, getPatientBookingsController);
/*
  Existing generic profile route
*/
router.get("/", authenticate, getProfileController);

module.exports = router;