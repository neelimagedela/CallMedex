const express = require("express");
const { authenticate } = require("../auth/middleware/auth.middleware");
const { authorize } = require("../auth/middleware/role.middleware");
const {
  getDashboard,
  getStaff,
  approveStaffHandler,
  rejectStaffHandler,
  getPatients,
  getOrgProfile,
  updateOrgProfile,
  getReports,
} = require("./supervisor.controller");

const router = express.Router();

// All supervisor routes require a valid JWT AND the "supervisor" role
router.use(authenticate, authorize(["organization", "supervisor"]));

router.get("/dashboard", getDashboard);

router.get("/staff", getStaff);
router.put("/staff/:id/approve", approveStaffHandler);
router.put("/staff/:id/reject", rejectStaffHandler);

router.get("/patients", getPatients);

router.get("/profile", getOrgProfile);
router.put("/profile", updateOrgProfile);

router.get("/reports", getReports);

module.exports = router;
