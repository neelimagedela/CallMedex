const AppError = require("../../../shared/utils/AppError");

const {
    registerSchema,
    loginSchema,
    verifyOtpSchema,
    sanitizeInput
} = require("./validation.service");

const {
    hashPassword,
    comparePassword
} = require("./password.service");

const {
    generateOtp,
    hashOtp,
    compareOtp,
    sendEmailOtp,
    sendPhoneOtp
} = require("./otp.service");

const {
    generateAccessToken,
    generateRefreshToken
} = require("./token.service");

const {
    createUser,
    findUserByEmail,
    updateEmailVerification,
    updatePhoneVerification,
    updateRegistrationStatus
} = require("../models/user.model");

const {
    createOtp,
    findLatestOtp,
    deleteOtp
} = require("../models/otp.model");

const {
    createSession,
    revokeSession
} = require("../models/session.model");

const registerUser = async(userData) => {

    registerSchema.parse(userData);

    const sanitizedData = sanitizeInput(userData);

    const existingUser =
    await findUserByEmailOrPhone(
        sanitizedData.email,
        sanitizedData.phone
    );

    if(existingUser) {

    const sameEmail =
        existingUser.email
        === sanitizedData.email;

    const samePhone =
        existingUser.phone
        === sanitizedData.phone;

    const incompleteRegistration =
        existingUser.registration_status
        !== "PROFILE_COMPLETED";

    if(
        sameEmail &&
        samePhone &&
        incompleteRegistration
    ) {

        return {
            success : true,
            message : "Resume registration",
            data : {
                userId : existingUser.id,
                registrationStatus :
                    existingUser.registration_status,
                isEmailVerified :
                    existingUser.is_email_verified,
                isPhoneVerified :
                    existingUser.is_phone_verified,
                nextStep :
                    existingUser.registration_status
            }
        };
    }

    throw new AppError(
        "User already exists",
        409
    );
}

    const passwordHash = await hashPassword(
        sanitizedData.password
    );

    let user;

    try {

        user = await createUser({
            ...sanitizedData,
            password_hash : passwordHash
        });

    } catch(error) {

        if(error.code === "ER_DUP_ENTRY") {
            throw new AppError(
                "Email or phone already exists",
                409
            );
        }

        throw error;
    }

    return {
        success : true,
        message : "Registration initiated",
        data : {
            userId : user.id,
            registrationStatus :
                "PENDING_VERIFICATION",
            nextStep : "VERIFY_CONTACTS"
        }
    };
};

const sendOtp = async({ userId, type, target }) => {

    const otp = generateOtp();

    const otpHash = await hashOtp(otp);

    const existingOtp = await findLatestOtp({
        userId,
        type
    });

    if(existingOtp) {
        await deleteOtp(existingOtp.id);
    }

    await createOtp({
        userId,
        otpHash,
        type
    });

    if(type === "email") {
        await sendEmailOtp(target, otp);
    }

    if(type === "phone") {
        await sendPhoneOtp(target, otp);
    }

    return {
        success : true,
        message : `${type} OTP sent`
    };
};

const verifyOtp = async(data) => {

    verifyOtpSchema.parse(data);

    const otpRecord = await findLatestOtp({
        userId : data.userId,
        type : data.type
    });

    if(!otpRecord) {
        throw new AppError(
            "OTP not found",
            404
        );
    }

    if(
        new Date(otpRecord.expires_at)
        < new Date()
    ) {

        await deleteOtp(otpRecord.id);

        throw new AppError(
            "OTP expired",
            400
        );
    }

    const otpMatches = await compareOtp(
        data.otp,
        otpRecord.otp_hash
    );

    if(!otpMatches) {
        throw new AppError(
            "Invalid OTP",
            400
        );
    }

    if(data.type === "email") {
        await updateEmailVerification(
            data.userId
        );
    }

    if(data.type === "phone") {
        await updatePhoneVerification(
            data.userId
        );
    }

    await deleteOtp(otpRecord.id);

    return {
        success : true,
        message : `${data.type} verified`
    };
};

const loginUser = async(credentials, req) => {

    loginSchema.parse(credentials);

    const sanitizedData = sanitizeInput(
        credentials
    );

    const user = await findUserByEmail(
        sanitizedData.email
    );

    if(!user) {
        throw new AppError(
            "Invalid credentials",
            401
        );
    }

    const passwordMatches =
        await comparePassword(
            sanitizedData.password,
            user.password_hash
        );

    if(!passwordMatches) {
        throw new AppError(
            "Invalid credentials",
            401
        );
    }

    if(
        user.registration_status
        === "PENDING_VERIFICATION"
    ) {

        return {
            success : false,
            requiresVerification : true,
            message :
                "Complete verification first",
            data : {
                userId : user.id,
                nextStep : "VERIFY_CONTACTS",
                isEmailVerified :
                    user.is_email_verified,
                isPhoneVerified :
                    user.is_phone_verified
            }
        };
    }

    const accessToken =
        generateAccessToken({
            id : user.id,
            role : user.role
        });

    const refreshToken =
        generateRefreshToken({
            id : user.id
        });

    const session = await createSession({
        userId : user.id,
        refreshToken,
        ipAddress : req.ip,
        userAgent :
            req.headers["user-agent"]
    });

    return {
        success : true,
        message : "Login successful",
        data : {
            accessToken,
            refreshToken,
            sessionId : session.id,
            user : {
                id : user.id,
                role : user.role,
                name : user.name
            },
            nextStep :
                user.registration_status
                === "VERIFIED"
                ? "ROLE_ONBOARDING"
                : "DASHBOARD"
        }
    };
};

const logoutUser = async(sessionId) => {

    await revokeSession(sessionId);

    return {
        success : true,
        message : "Logout successful"
    };
};

module.exports = {
    registerUser,
    sendOtp,
    verifyOtp,
    loginUser,
    logoutUser
};