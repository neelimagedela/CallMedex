const express = require("express");
const router = express.Router();
const { authenticate } = require("../auth/middleware/auth.middleware");
const staffController = require("./staff.controller");

// lab tech dashboard
router.get("/lab-technician/dashboard", authenticate, staffController.getLabTechnicianDashboard);

// walkin status progression
router.patch("/lab-technician/walkin-status", authenticate, staffController.updateWalkinStatusController);

// home service accept/reject + progression
router.patch("/lab-technician/home-service-status", authenticate, staffController.updateHomeServiceStatusController);

// report upload
router.post("/lab-technician/upload-report", authenticate, staffController.uploadReportController);

// patient fetches their own reports (uses authenticate, not staff check)
router.get("/reports/my", authenticate, staffController.getReportsForUserController);

module.exports = router;