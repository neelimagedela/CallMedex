const express = require("express");

const {
  listHomeServiceTestsController,
} = require("../controllers/homeService.controller");

const {
  bookHomeServiceController,
  getPhleboProfileController,
  updatePhleboLocationController,
  listPhleboHomeServiceBookingsController,
  listCompletedPhleboBookingsController,
  acceptHomeServiceBookingController,
  getPhleboActiveBookingController,
  updateHomeServiceBookingStatusController,
} = require("../controllers/homeServiceBooking.controller");

const { authenticate } = require("../../auth/middleware/auth.middleware");

const router = express.Router();

router.get("/tests", listHomeServiceTestsController);

router.post("/book", authenticate, bookHomeServiceController);

router.get(
  "/phlebo/profile",
  authenticate,
  getPhleboProfileController
);

router.post(
  "/phlebo/location",
  authenticate,
  updatePhleboLocationController
);

router.get(
  "/phlebo/bookings",
  authenticate,
  listPhleboHomeServiceBookingsController
);

router.get(
  "/phlebo/bookings/completed",
  authenticate,
  listCompletedPhleboBookingsController
);

router.patch(
  "/phlebo/bookings/:bookingId/accept",
  authenticate,
  acceptHomeServiceBookingController
);

router.get(
  "/phlebo/active",
  authenticate,
  getPhleboActiveBookingController
);

router.patch(
  "/phlebo/bookings/:bookingId/status",
  authenticate,
  updateHomeServiceBookingStatusController
);

module.exports = router;