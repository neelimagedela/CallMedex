const express = require("express");

const {
  bookWalkInCenterController,
} = require("../controllers/walkInCenters.controller");

const { authenticate } = require("../../auth/middleware/auth.middleware");

const router = express.Router();

router.post("/book", authenticate, bookWalkInCenterController);

module.exports = router;