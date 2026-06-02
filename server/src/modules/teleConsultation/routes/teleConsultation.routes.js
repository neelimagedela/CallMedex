const express = require("express");

const router = express.Router();

const { authenticate } =
require("../../auth/middleware/auth.middleware");

const {
  bookTeleConsultation,
  getMyBookings
} = require("../controllers/teleConsultation.controller");

router.post(
  "/book",
  authenticate,
  bookTeleConsultation
);

router.get(
  "/my-bookings",
  authenticate,
  getMyBookings
);

module.exports = router;