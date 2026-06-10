const express = require("express");

const router = express.Router();

const {
  bookDiagnosticPackage,
  getDiagnosticPackages,
  getMyDiagnosticBookings,
} = require("../controllers/diagnosticPackage.controller");

const {
  authenticate,
} = require("../../auth/middleware/auth.middleware");

router.get(
  "/my-bookings",
  authenticate,
  getMyDiagnosticBookings
);

router.post(
  "/book",
  authenticate,
  bookDiagnosticPackage
);

module.exports = router;