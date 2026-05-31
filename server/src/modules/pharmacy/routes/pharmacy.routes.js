const express = require("express");

const { authenticate } = require("../../auth/middleware/auth.middleware");

const {
  getPharmacyPatientDetailsController,
  searchPharmacyMedicinesController,
  createPharmacyOrderController,
  getMyPharmacyOrdersController,
} = require("../controllers/pharmacy.controller");

const router = express.Router();

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

module.exports = router;