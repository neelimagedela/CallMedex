const express = require("express");
const router = express.Router();

const { authenticate } = require("../../auth/middleware/auth.middleware");
const controller = require("../controllers/consultancyHome.controller");
const { validateCreateBooking } = require("../validators/consultancyHome.validator");

router.get("/services", authenticate, controller.getServices);
router.get("/me", authenticate, controller.getMe);
router.get("/slots", authenticate, controller.getSlots);
router.post(
  "/bookings",
  authenticate,
  validateCreateBooking,
  controller.createBooking
);

module.exports = router;