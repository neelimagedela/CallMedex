const express = require("express");

const {
    registerController,
    sendOtpController,
    verifyOtpController,
    loginController,
    logoutController
} = require("../controllers/auth.controller");

const {
    authenticate
} = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
    "/register",
    registerController
);

router.post(
    "/send-otp",
    sendOtpController
);

router.post(
    "/verify-otp",
    verifyOtpController
);

router.post(
    "/login",
    loginController
);

router.post(
    "/logout",
    authenticate,
    logoutController
);

module.exports = router;