const express = require("express");
const { bookAppointmentController, listAppointmentsController } = require("../controllers/appointment.controller");
const { authenticate } = require("../../auth/middleware/auth.middleware");

const router = express.Router();

// Route for booking an appointment (middleware handles optional auth token)
router.post("/book", (req, res, next) => {
  if (req.headers.authorization || (req.cookies && req.cookies.accessToken)) {
    return authenticate(req, res, next);
  }
  next();
}, bookAppointmentController);

// Route for listing logged-in user's appointments
router.get("/", authenticate, listAppointmentsController);

module.exports = router;
