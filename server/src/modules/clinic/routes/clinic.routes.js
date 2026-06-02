const express = require("express");

const {
  bookClinicAppointmentController,
  getMyClinicAppointmentsController,
} = require("../controllers/clinic.controller");

const { authenticate } = require("../../auth/middleware/auth.middleware");
const {
  validateClinicAppointment,
} = require("../validators/clinic.validator");

const router = express.Router();

router.post(
  "/book",
  authenticate,
  validateClinicAppointment,
  bookClinicAppointmentController
);

router.get("/my-appointments", authenticate, getMyClinicAppointmentsController);

module.exports = router;