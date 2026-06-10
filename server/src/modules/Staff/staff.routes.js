const express = require("express");
const router = express.Router();
const { authenticate } = require("../auth/middleware/auth.middleware");
const staffController = require("./staff.controller");

router.get("/lab-technician/dashboard", authenticate, staffController.getLabTechnicianDashboard);
router.patch("/lab-technician/walkin-status", authenticate, staffController.updateWalkinStatusController);

module.exports = router;