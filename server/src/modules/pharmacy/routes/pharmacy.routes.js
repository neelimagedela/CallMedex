const express = require("express");

const { authenticate } = require("../../auth/middleware/auth.middleware");

const {
  getPharmacyPatientDetailsController,
  searchPharmacyMedicinesController,
  createPharmacyOrderController,
  getMyPharmacyOrdersController,
} = require("../controllers/pharmacy.controller");

const {
  getPharmacyDashboardProfileController,
  getPharmacyInventoryController,
  getPharmacyOrdersController,
  updatePharmacyOrderStatusController,
} = require("../controllers/pharmacyDashboard.controller");

const router = express.Router();

/*
  Patient pharmacy booking routes
*/

router.get(
  "/patient-details",
  authenticate,
  getPharmacyPatientDetailsController
);

router.get(
  "/medicines",
  authenticate,
  searchPharmacyMedicinesController
);

router.post(
  "/orders",
  authenticate,
  createPharmacyOrderController
);

router.get(
  "/orders/my",
  authenticate,
  getMyPharmacyOrdersController
);

/*
  Pharmacy dashboard routes
*/

router.get(
  "/dashboard/profile",
  authenticate,
  getPharmacyDashboardProfileController
);

router.get(
  "/dashboard/inventory",
  authenticate,
  getPharmacyInventoryController
);

router.get(
  "/dashboard/orders",
  authenticate,
  getPharmacyOrdersController
);

router.patch(
  "/dashboard/orders/:orderId/status",
  authenticate,
  updatePharmacyOrderStatusController
);

module.exports = router;