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
  listRejectedPhleboBookingsController,
  resubmitRejectedBookingController,
  acceptHomeServiceBookingController,
  getPhleboActiveBookingController,
  updateHomeServiceBookingStatusController,
  getPhleboWalletController,
} = require("../controllers/homeServiceBooking.controller");

const { authenticate } = require("../../auth/middleware/auth.middleware");

const router = express.Router();

router.get("/tests", listHomeServiceTestsController);

router.post("/book", authenticate, bookHomeServiceController);

router.get("/phlebo/profile", authenticate, getPhleboProfileController);

router.post("/phlebo/location", authenticate, updatePhleboLocationController);

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

router.get(
  "/phlebo/wallet",
  authenticate,
  getPhleboWalletController
);

router.get(
  "/phlebo/bookings/rejected",
  authenticate,
  listRejectedPhleboBookingsController
);

router.patch(
  "/phlebo/bookings/:bookingId/resubmit",
  authenticate,
  resubmitRejectedBookingController
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