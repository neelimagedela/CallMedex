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
  getPatientReports,
  getPhlebos,
  getPhlebosWallet,
  updatePhleboBookingStatus,
} = require("./supervisor.controller");

const router = express.Router();

router.use(authenticate);
router.use(authorize(["organization", "supervisor"]));

router.get("/dashboard", getDashboard);

router.get("/staff", getStaff);
router.put("/staff/:id/approve", approveStaffHandler);
router.put("/staff/:id/reject", rejectStaffHandler);

router.get("/patients", getPatients);

router.get("/phlebos", getPhlebos);
router.get("/phlebos/:phleboUserId/wallet", getPhlebosWallet);
router.patch("/phlebo-bookings/:bookingId/status", updatePhleboBookingStatus);

router.get("/profile", getOrgProfile);
router.put("/profile", updateOrgProfile);

router.get("/reports", getReports);
router.get("/patient-reports", getPatientReports);

module.exports = router;