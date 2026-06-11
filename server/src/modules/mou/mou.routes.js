const express = require("express");
const router = express.Router();

const {
  getMouByRole,
  acceptMou,
  getMouAcceptances
} = require("./mou.controller");

router.post("/accept", acceptMou);
router.get("/list", getMouAcceptances);
router.get("/:role", getMouByRole);

module.exports = router;