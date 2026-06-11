const express = require("express");

const router = express.Router();

const { authenticate } = require("../auth/middleware/auth.middleware");
const staffController = require("./staff.controller");

router.get(
  "/lab-technician/dashboard",
  authenticate,
  staffController.getLabTechnicianDashboard
);

router.patch(
  "/lab-technician/walkin-status",
  authenticate,
  staffController.updateWalkinStatusController
);

router.patch(
  "/lab-technician/scan-status",
  authenticate,
  staffController.updateScanStatusController
);

router.patch(
  "/lab-technician/home-service-status",
  authenticate,
  staffController.updateHomeServiceStatusController
);

router.post(
  "/lab-technician/upload-report",
  authenticate,
  staffController.uploadReportController
);

router.get(
  "/reports/my",
  authenticate,
  staffController.getReportsForUserController
);

module.exports = router;