const express = require("express");
const { onboardProfileController, getProfileController } = require("../controllers/profile.controller");
const { authenticate } = require("../../auth/middleware/auth.middleware");

const router = express.Router();

// Allow both token authentication and manual userId/role passing in body during initial registration-onboarding
router.post("/onboard", (req, res, next) => {
  if (req.headers.authorization || (req.cookies && req.cookies.accessToken)) {
    return authenticate(req, res, next);
  }
  next();
}, onboardProfileController);

router.get("/me", authenticate, getProfileController);

module.exports = router;
