const asyncHandler = require(
    "../../../shared/utils/asyncHandler"
);

const {
    successResponse
} = require(
    "../../../shared/utils/response"
);

const {
    registerUser,
    sendOtp,
    verifyOtp,
    loginUser,
    logoutUser
} = require("../services/auth.service");

const registerController = asyncHandler(
    async(req, res) => {

        const result = await registerUser(
            req.body
        );

        return successResponse({
            res,
            status : 201,
            message : result.message,
            data : result.data
        });
    }
);

const sendOtpController = asyncHandler(
    async(req, res) => {

        const result = await sendOtp(
            req.body
        );

        return successResponse({
            res,
            message : result.message
        });
    }
);

const verifyOtpController = asyncHandler(
    async(req, res) => {

        const result = await verifyOtp(
            req.body
        );

        return successResponse({
            res,
            message : result.message
        });
    }
);

const loginController = asyncHandler(
    async(req, res) => {

        const result = await loginUser(
            req.body,
            req
        );

        if(result.data?.refreshToken) {

            res.cookie(
                "refreshToken",
                result.data.refreshToken,
                {
                    httpOnly : true,
                    secure :
                        process.env.NODE_ENV
                        === "production",
                    sameSite : "strict",
                    maxAge :
                        7 * 24 * 60 * 60 * 1000
                }
            );
        }

        return successResponse({
            res,
            message : result.message,
            data : result.data
        });
    }
);

const logoutController = asyncHandler(
    async(req, res) => {

        const result = await logoutUser(
            req.user.sessionId
        );

        res.clearCookie("refreshToken");

        return successResponse({
            res,
            message : result.message
        });
    }
);

module.exports = {
    registerController,
    sendOtpController,
    verifyOtpController,
    loginController,
    logoutController
};