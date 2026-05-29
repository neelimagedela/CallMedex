const express = require("express");

const {
  listHomeServiceTestsController,
} = require("../controllers/homeService.controller");

const {
  bookHomeServiceController,
  listPhleboHomeServiceBookingsController,
} = require("../controllers/homeServiceBooking.controller");

const { authenticate } = require("../../auth/middleware/auth.middleware");

const router = express.Router();

router.get("/tests", listHomeServiceTestsController);

router.post("/book", authenticate, bookHomeServiceController);

router.get(
  "/phlebo/bookings",
  authenticate,
  listPhleboHomeServiceBookingsController
);

module.exports = router;