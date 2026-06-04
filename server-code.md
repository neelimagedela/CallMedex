
===============================
FILE: server\src\config\db.js
===============================

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  port:     Number(process.env.DB_PORT),
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // UTF-8 encoding so special characters (dashes, symbols, Indian language)
  // are stored and retrieved correctly without garbling
  charset: "utf8mb4",
});

pool.getConnection()
  .then((connection) => {
    console.log("Database connected successfully");
    connection.release();
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });

module.exports = pool;

===============================
FILE: server\src\config\mail.js
===============================

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER?.trim(),
    pass: process.env.SMTP_PASS?.trim(),
  },
});

module.exports = transporter;

===============================
FILE: server\src\modules\appointment\controllers\appointment.controller.js
===============================

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const asyncHandler = require("../../../shared/utils/asyncHandler");
const { successResponse } = require("../../../shared/utils/response");
const { createAppointment, getAppointmentsByUserId } = require("../models/appointment.model");
const AppError = require("../../../shared/utils/AppError");

const bookAppointmentController = asyncHandler(async (req, res) => {
  const userId  = req.user.id;
  const {
    patientName,
    patientAge,
    patientSex,
    patientMobile,
    patientEmail,
    patientAddress,
    branch,
    scans,
    appointmentDate,
    timeSlot,
    prescription, // base64 string
    totalAmount
  } = req.body;
   if (req.user.role !== "patient") {
  throw new AppError("Only patients can book scan appointments", 403);
}
  if (!patientName || !patientAge || !patientSex || !patientMobile || !patientEmail || !patientAddress || !branch || !scans || !appointmentDate || !timeSlot) {
    throw new AppError("All required booking fields must be provided", 400);
  }

  let prescriptionPath = null;

  if (prescription) {
    try {
      const match = prescription.match(/^data:([^;]+);base64,(.+)$/);
      let fileBuffer;
      let fileExtension = "png";
      
      if (match) {
        const contentType = match[1];
        fileBuffer = Buffer.from(match[2], "base64");
        fileExtension = contentType.split("/")[1] || "png";
      } else {
        fileBuffer = Buffer.from(prescription, "base64");
      }

      const uploadDir = path.join(__dirname, "../../../../uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filename = `${crypto.randomUUID()}.${fileExtension}`;
      const absolutePath = path.join(uploadDir, filename);
      fs.writeFileSync(absolutePath, fileBuffer);
      prescriptionPath = `/uploads/${filename}`;
    } catch (err) {
      console.error("Failed to save prescription file:", err);
      // Fallback: don't crash, just proceed without file path
    }
  }

  const appointment = await createAppointment({
    userId,
    patientName,
    patientAge: Number(patientAge),
    patientSex,
    patientMobile,
    patientEmail,
    patientAddress,
    branch,
    scans,
    appointmentDate,
    timeSlot,
    prescriptionPath,
    totalAmount: Number(totalAmount) || 0
  });

  return successResponse({
    res,
    status: 201,
    message: "Appointment booked successfully",
    data: appointment
  });
});

const listAppointmentsController = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  const appointments = await getAppointmentsByUserId(userId);

  return successResponse({
    res,
    status: 200,
    message: "Appointments retrieved successfully",
    data: appointments
  });
});

module.exports = {
  bookAppointmentController,
  listAppointmentsController
};


===============================
FILE: server\src\modules\appointment\models\appointment.model.js
===============================

const db = require("../../../config/db");

const createAppointment = async (appointmentData) => {
  const scansJson = Array.isArray(appointmentData.scans)
    ? JSON.stringify(appointmentData.scans)
    : JSON.stringify(appointmentData.scans || []);
const receiptId =
  `AP${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const [result] = await db.execute(
    `
    INSERT INTO appointments (
      receipt_id,
      user_id,
      patient_name,
      patient_age,
      patient_sex,
      patient_mobile,
      patient_email,
      patient_address,
      branch,
      scans,
      appointment_date,
      time_slot,
      prescription_path,
      total_amount,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `,
    [
      receiptId,
      appointmentData.userId || null,
      appointmentData.patientName,
      appointmentData.patientAge,
      appointmentData.patientSex,
      appointmentData.patientMobile,
      appointmentData.patientEmail,
      appointmentData.patientAddress,
      appointmentData.branch,
      scansJson,
      appointmentData.appointmentDate,
      appointmentData.timeSlot,
      appointmentData.prescriptionPath || null,
      appointmentData.totalAmount || 0.00,
      appointmentData.status || "pending"
    ]
  );

  return {
    id: result.insertId,
    ...appointmentData
  };
};

const getAppointmentsByUserId = async (userId) => {
  const [rows] = await db.execute(
    `SELECT * FROM appointments WHERE user_id = ? ORDER BY appointment_date DESC, created_at DESC`,
    [userId]
  );

  return rows;
};

const getAppointmentById = async (id) => {
  const [rows] = await db.execute(
    `SELECT * FROM appointments WHERE id = ? LIMIT 1`,
    [id]
  );

  return rows[0];
};

module.exports = {
  createAppointment,
  getAppointmentsByUserId,
  getAppointmentById
};

===============================
FILE: server\src\modules\appointment\routes\appointment.routes.js
===============================

const express = require("express");
const { bookAppointmentController, listAppointmentsController } = require("../controllers/appointment.controller");
const { authenticate } = require("../../auth/middleware/auth.middleware");

const router = express.Router();

// Route for booking an appointment (middleware handles optional auth token)
router.post("/book", authenticate, bookAppointmentController);

// Route for listing logged-in user's appointments
router.get("/", authenticate, listAppointmentsController);

module.exports = router;


===============================
FILE: server\src\modules\auth\controllers\auth.controller.js
===============================

const asyncHandler = require("../../../shared/utils/asyncHandler");

const { successResponse } = require("../../../shared/utils/response");

const {
  registerUser,
  sendOtp,
  verifyOtp,
  loginUser,
  logoutUser,
} = require("../services/auth.service");

const registerController = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);

  return successResponse({
    res,
    status: 201,
    message: result.message,
    data: result.data,
  });
});

const sendOtpController = asyncHandler(async (req, res) => {
  const result = await sendOtp(req.body);

  return successResponse({
    res,
    message: result.message,
  });
});

/*
  Same logic as sendOtpController.
  This is added because frontend calls /auth/resend-otp.
*/
const resendOtpController = asyncHandler(async (req, res) => {
  const result = await sendOtp(req.body);

  return successResponse({
    res,
    message: result.message || "OTP resent successfully",
  });
});

const verifyOtpController = asyncHandler(async (req, res) => {
  const result = await verifyOtp(req.body);

  return res.status(200).json(result);
});

const loginController = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body, req);

  if (result.data?.refreshToken) {
    res.cookie("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  return successResponse({
    res,
    message: result.message,
    data: result.data,
  });
});

const logoutController = asyncHandler(async (req, res) => {
  const result = await logoutUser(req.user.sessionId);

  res.clearCookie("refreshToken");

  return successResponse({
    res,
    message: result.message,
  });
});

module.exports = {
  registerController,
  sendOtpController,
  resendOtpController,
  verifyOtpController,
  loginController,
  logoutController,
};

===============================
FILE: server\src\modules\auth\middleware\auth.middleware.js
===============================

const AppError = require("../../../shared/utils/AppError");
const { verifyAccessToken } = require("../services/token.service");

const authenticate = async (req, res, next) => {
  try {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new AppError("Access token is missing", 401);
    }

    try {
      const decoded = verifyAccessToken(token);
      req.user = decoded;
      next();
    } catch (err) {
      throw new AppError("Invalid or expired access token", 401);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
};


===============================
FILE: server\src\modules\auth\middleware\role.middleware.js
===============================

const authorize = (allowedRoles) => {
  return async (req, res, next) => {
    // TODO:
    // 1. Check authenticated user
    // 2. Validate allowed role
    // 3. Continue or reject request
  };
};

module.exports = {
  authorize,
};


===============================
FILE: server\src\modules\auth\models\otp.model.js
===============================

const db = require("../../../config/db");

const createOtp = async (data) => {
  const expiresMinutes = Number(process.env.OTP_EXPIRES_MINUTES || 5);

  await db.execute(
    `
    INSERT INTO verification_otps
    (
      user_id,
      otp_hash,
      type,
      expires_at
    )
    VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL ? MINUTE))
    `,
    [data.userId, data.otpHash, data.type, expiresMinutes]
  );
};

/**
 * Finds the latest unused, non-expired OTP for a user.
 * Expiry is checked in SQL using the DB server's NOW() to avoid
 * any Node.js ↔ MySQL timezone mismatch.
 */
const findLatestOtp = async (data) => {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM verification_otps
    WHERE user_id = ?
    AND type = ?
    AND is_used = FALSE
    AND expires_at > NOW()
    ORDER BY id DESC
    LIMIT 1
    `,
    [data.userId, data.type]
  );

  return rows[0];
};

/**
 * Finds the latest unused OTP regardless of expiry (used to mark
 * a stale OTP as used before issuing a new one).
 */
const findLatestOtpAny = async (data) => {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM verification_otps
    WHERE user_id = ?
    AND type = ?
    AND is_used = FALSE
    ORDER BY id DESC
    LIMIT 1
    `,
    [data.userId, data.type]
  );

  return rows[0];
};

const deleteOtp = async (otpId) => {
  await db.execute(
    `
    DELETE FROM verification_otps
    WHERE id = ?
    `,
    [otpId]
  );
};

const markOtpUsed = async (otpId) => {
  await db.execute(
    `
    UPDATE verification_otps
    SET is_used = TRUE
    WHERE id = ?
    `,
    [otpId]
  );
};

module.exports = {
  createOtp,
  findLatestOtp,
  findLatestOtpAny,
  deleteOtp,
  markOtpUsed,
};

===============================
FILE: server\src\modules\auth\models\session.model.js
===============================

const db = require("../../../config/db");

const createSession = async(data) => {

    const [result] = await db.execute(
        `
        INSERT INTO sessions
        (
            user_id,
            refresh_token,
            ip_address,
            user_agent,
            expires_at
        )
        VALUES
        (
            ?, ?, ?, ?,
            DATE_ADD(
                NOW(),
                INTERVAL 7 DAY
            )
        )
        `,
        [
            data.userId,
            data.refreshToken,
            data.ipAddress,
            data.userAgent
        ]
    );

    return {
        id : result.insertId
    };
};

const findSessionByRefreshToken = async(refreshToken) => {

    const [rows] = await db.execute(
        `
        SELECT *
        FROM sessions
        WHERE refresh_token = ?
        AND is_revoked = FALSE
        AND expires_at > NOW()
        LIMIT 1
        `,
        [refreshToken]
    );

    return rows[0];
};

const revokeSession = async(sessionId) => {

    await db.execute(
        `
        UPDATE sessions
        SET is_revoked = TRUE
        WHERE id = ?
        `,
        [sessionId]
    );
};

module.exports = {
    createSession,
    findSessionByRefreshToken,
    revokeSession
};

===============================
FILE: server\src\modules\auth\models\user.model.js
===============================

const db = require("../../../config/db");

const createUser = async(userData) => {

    const [result] = await db.execute(
        `
        INSERT INTO users
        (
            name,
            phone,
            email,
            password_hash,
            role,
            gender,
            dob,
            address,
            city,
            district,
            state,
            pincode,
            country
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            userData.name,
            userData.phone,
            userData.email,
            userData.password_hash,
            userData.role,
            userData.gender || null,
            userData.dob || null,
            userData.address || null,
            userData.city || null,
            userData.district || null,
            userData.state || null,
            userData.pincode || null,
            userData.country || null
        ]
    );

    return {
        id : result.insertId,
        ...userData
    };
};

const findUserByEmail = async(email) => {

    const [rows] = await db.execute(
        `
        SELECT *
        FROM users
        WHERE email = ?
        LIMIT 1
        `,
        [email]
    );

    return rows[0];
};

const findUserByPhone = async(phone) => {

    const [rows] = await db.execute(
        `
        SELECT *
        FROM users
        WHERE phone = ?
        LIMIT 1
        `,
        [phone]
    );

    return rows[0];
};

const findUserByEmailOrPhone = async(
    email,
    phone
) => {

    const [rows] = await db.execute(
        `
        SELECT *
        FROM users
        WHERE email = ?
        OR phone = ?
        LIMIT 1
        `,
        [email, phone]
    );

    return rows[0];
};

const findUserById = async(userId) => {

    const [rows] = await db.execute(
        `
        SELECT *
        FROM users
        WHERE id = ?
        LIMIT 1
        `,
        [userId]
    );

    return rows[0];
};

const updateEmailVerification = async(userId) => {

    await db.execute(
        `
        UPDATE users
        SET is_email_verified = TRUE
        WHERE id = ?
        `,
        [userId]
    );
};

const updatePhoneVerification = async(userId) => {

    await db.execute(
        `
        UPDATE users
        SET is_phone_verified = TRUE
        WHERE id = ?
        `,
        [userId]
    );
};

const updateRegistrationStatus = async(userId, status) => {

    await db.execute(
        `
        UPDATE users
        SET registration_status = ?
        WHERE id = ?
        `,
        [status, userId]
    );
};
const completeEmailVerification = async(userId, publicUserId) => {
    await db.execute(
        `
        UPDATE users
        SET 
            is_email_verified = TRUE,
            registration_status = 'VERIFIED',
            public_user_id = ?
        WHERE id = ?
        `,
        [publicUserId, userId]
    );
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserByPhone,
    findUserByEmailOrPhone,
    findUserById,
    updateEmailVerification,
    updatePhoneVerification,
    updateRegistrationStatus,
    completeEmailVerification
};

===============================
FILE: server\src\modules\auth\routes\auth.routes.js
===============================

const express = require("express");

const {
    registerController,
    sendOtpController,
    verifyOtpController,
    loginController,
    logoutController,
    resendOtpController
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
    "/resend-otp",
    resendOtpController
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

===============================
FILE: server\src\modules\auth\services\auth.service.js
===============================

const AppError = require("../../../shared/utils/AppError");

const {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
  sanitizeInput,
} = require("./validation.service");

const {
  hashPassword,
  comparePassword,
} = require("./password.service");

const {
  generateOtp,
  hashOtp,
  compareOtp,
  sendEmailOtp,
  sendPhoneOtp,
} = require("./otp.service");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("./token.service");

const {
  generatePublicUserId,
} = require("./publicId.service");

const {
  createUser,
  findUserByEmail,
  findUserByEmailOrPhone,
  findUserById,
  updatePhoneVerification,
  completeEmailVerification,
} = require("../models/user.model");

const {
  createOtp,
  findLatestOtp,
  findLatestOtpAny,
  markOtpUsed,
} = require("../models/otp.model");

const {
  createSession,
  revokeSession,
} = require("../models/session.model");

const registerUser = async (userData) => {

  registerSchema.parse(userData);

  const sanitizedData = sanitizeInput(userData);

  const existingUser = await findUserByEmailOrPhone(
    sanitizedData.email,
    sanitizedData.phone
  );

  if (existingUser) {

    if (existingUser.registration_status !== "PROFILE_COMPLETED") {

      if (!existingUser.is_email_verified) {

        await sendOtp({
          userId: existingUser.id,
          type: "email",
          target: existingUser.email,
          name: existingUser.name,
        });
      }

      return {
        success: true,
        message: existingUser.is_email_verified
          ? "Resume registration"
          : "Resume registration. OTP resent to email.",

        data: {
          userId: existingUser.id,
          publicUserId: existingUser.public_user_id,
          registrationStatus: existingUser.registration_status,
          isEmailVerified: existingUser.is_email_verified,
          isPhoneVerified: existingUser.is_phone_verified,
          nextStep: existingUser.is_email_verified ? "LOGIN" : "VERIFY_EMAIL",
        },
      };
    }

    throw new AppError("User already exists", 409);
  }

  const passwordHash = await hashPassword(sanitizedData.password);

  const user = await createUser({
    ...sanitizedData,
    password_hash: passwordHash,
  });

  await sendOtp({
    userId: user.id,
    type: "email",
    target: user.email,
    name: user.name,
  });

  return {
    success: true,
    message: "Registration initiated. OTP sent to email.",

    data: {
      userId: user.id,
      publicUserId: null,
      registrationStatus: "PENDING_VERIFICATION",
      nextStep: "VERIFY_EMAIL",
    },
  };
};

const sendOtp = async ({ userId, type, target, name }) => {

  const otp = generateOtp();
  const otpHash = await hashOtp(otp);

  // Invalidate any existing unused OTP regardless of expiry
  const existingOtp = await findLatestOtpAny({ userId, type });

  if (existingOtp) {
    await markOtpUsed(existingOtp.id);
  }

  await createOtp({ userId, otpHash, type });

  if (type === "email") {
    await sendEmailOtp(target, otp, name);
  }

  if (type === "phone") {
    await sendPhoneOtp(target, otp);
  }

  return {
    success: true,
    message: `${type} OTP sent`,
  };
};

const verifyOtp = async (data) => {

  verifyOtpSchema.parse(data);

  // findLatestOtp already filters by is_used = FALSE AND expires_at > NOW()
  const otpRecord = await findLatestOtp({
    userId: data.userId,
    type: data.type,
  });

  if (!otpRecord) {
    // Could be not found OR expired — give a generic message to avoid information leakage
    throw new AppError("OTP is invalid or has expired. Please request a new one.", 400);
  }

  const otpMatches = await compareOtp(data.otp, otpRecord.otp_hash);

  if (!otpMatches) {
    throw new AppError("Invalid OTP", 400);
  }

  const user = await findUserById(data.userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  let publicUserId = user.public_user_id;

  if (!publicUserId) {
    publicUserId = generatePublicUserId(user.role, user.id);
  }

  if (data.type === "email") {
    await completeEmailVerification(user.id, publicUserId);
  }

  if (data.type === "phone") {
    await updatePhoneVerification(user.id);
  }

  await markOtpUsed(otpRecord.id);

  return {
    success: true,
    message: `${data.type} verified successfully`,

    data: {
      userId: user.id,
      publicUserId,
      registrationStatus: "VERIFIED",
      nextStep: "LOGIN",
    },
  };
};

const loginUser = async (credentials, req) => {

  loginSchema.parse(credentials);

  const sanitizedData = sanitizeInput(credentials);

  const user = await findUserByEmail(sanitizedData.email);

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatches = await comparePassword(
    sanitizedData.password,
    user.password_hash
  );

  if (!passwordMatches) {
    throw new AppError("Invalid credentials", 401);
  }

  if (
    !user.is_email_verified ||
    user.registration_status === "PENDING_VERIFICATION"
  ) {
    return {
      success: false,
      requiresVerification: true,
      message: "Complete email verification first",

      data: {
        userId: user.id,
        publicUserId: user.public_user_id,
        nextStep: "VERIFY_EMAIL",
      },
    };
  }

  const accessToken = generateAccessToken({
    id: user.id,
    publicUserId: user.public_user_id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({ id: user.id });

  const session = await createSession({
    userId: user.id,
    refreshToken,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  return {
    success: true,
    message: "Login successful",

    data: {
      accessToken,
      refreshToken,
      sessionId: session.id,

      user: {
        id: user.public_user_id,
        internalId: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
      },

      nextStep:
        user.registration_status === "VERIFIED"
          ? "ROLE_ONBOARDING"
          : "DASHBOARD",
    },
  };
};

const logoutUser = async (sessionId) => {

  await revokeSession(sessionId);

  return {
    success: true,
    message: "Logout successful",
  };
};

module.exports = {
  registerUser,
  sendOtp,
  verifyOtp,
  loginUser,
  logoutUser,
};

===============================
FILE: server\src\modules\auth\services\email.service.js
===============================

const transporter = require("../../../config/mail");

const sendOtpEmail = async ({ to, otp, name }) => {
  const isSmtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER;

  if (!isSmtpConfigured) {
    console.log(`\n--- [LOCAL DEVELOPMENT OTP FALLBACK] ---`);
    console.log(`To: ${to} (${name})`);
    console.log(`OTP: ${otp}`);
    console.log(`-----------------------------------------\n`);
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject: "CallMedex Email Verification OTP",
      html: `
        <h2>Hello ${name},</h2>
        <p>Your CallMedex verification OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP will expire in ${process.env.OTP_EXPIRES_MINUTES || 5} minutes.</p>
        <p>If you did not request this, ignore this email.</p>
      `,
    });
  } catch (error) {
    console.error("SMTP sending failed, falling back to console log:", error);
    console.log(`\n--- [LOCAL DEVELOPMENT OTP FALLBACK (SMTP ERROR)] ---`);
    console.log(`To: ${to} (${name})`);
    console.log(`OTP: ${otp}`);
    console.log(`------------------------------------------------------\n`);
  }
};

module.exports = {
  sendOtpEmail,
};

===============================
FILE: server\src\modules\auth\services\otp.service.js
===============================

const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { sendOtpEmail } = require("./email.service");

const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString();
};

const sendEmailOtp = async(email, otp, name = "User") => {
    await sendOtpEmail({
        to: email,
        otp,
        name
    });
};

const sendPhoneOtp = async(phone, otp) => {
    console.log(`Phone OTP for ${phone}: ${otp}`);
};

const hashOtp = async(otp) => {
    return bcrypt.hash(otp, 10);
};

const compareOtp = async(otp, hash) => {
    return bcrypt.compare(otp, hash);
};

module.exports = {
    generateOtp,
    sendEmailOtp,
    sendPhoneOtp,
    hashOtp,
    compareOtp
};

===============================
FILE: server\src\modules\auth\services\password.service.js
===============================

const bcrypt = require("bcryptjs");

const hashPassword = async(password) => {
    return bcrypt.hash(password, 12);
};

const comparePassword = async(password, hash) => {
    return bcrypt.compare(password, hash);
};

module.exports = {
    hashPassword,
    comparePassword
};

===============================
FILE: server\src\modules\auth\services\publicId.service.js
===============================

const rolePrefixes = {
    patient: "PAT",
    phlebo: "PHL",
    doctor: "DOC",
    admin: "ADM",
    diagnostic: "DIA",
    consultancy: "CON",
    pharmacy: "PHM",
    organization: "ORG"
};
const generatePublicUserId = (role, internalId) => {
    const prefix = rolePrefixes[role];

    if (!prefix) {
        throw new Error("Invalid role");
    }

    const year = new Date().getFullYear();
    const paddedId = String(internalId).padStart(6, "0");

    return `CMDX-${prefix}-${year}-${paddedId}`;
};

module.exports = {
    generatePublicUserId
};

===============================
FILE: server\src\modules\auth\services\session.service.js
===============================

const {
    createSession,
    revokeSession
} = require("../models/session.model");

module.exports = {
    createSession,
    revokeSession
};

===============================
FILE: server\src\modules\auth\services\token.service.js
===============================

const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {

    return jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRES_IN
        }
    );
};

const generateRefreshToken = (payload) => {

    return jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRES_IN
        }
    );
};

const verifyAccessToken = (token) => {

    return jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET
    );
};

const verifyRefreshToken = (token) => {

    return jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET
    );
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};

===============================
FILE: server\src\modules\auth\services\validation.service.js
===============================

const { z } = require("zod");

const registerSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(100, "Name must be less than 100 characters")
        .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),

    phone: z
        .string()
        .length(10, "Phone number must be exactly 10 digits")
        .regex(/^[6-9]\d{9}$/, "Enter a valid Indian phone number"),

    email: z
        .string()
        .email("Enter a valid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must be less than 100 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),

    role: z.enum([
        "patient",
        "phlebo",
        "doctor",
        "admin",
        "diagnostic",
        "consultancy",
        "pharmacy",
        "organization"
    ], { errorMap: () => ({ message: "Invalid role selected" }) }),

    gender: z
        .string()
        .max(20)
        .optional()
        .nullable(),

    dob: z
        .string()
        .optional()
        .nullable()
        .refine((val) => {
            if (!val) return true;
            const date = new Date(val);
            const today = new Date();
            return date < today;
        }, "Date of birth cannot be in the future"),

    address: z
        .string()
        .max(255, "Address must be less than 255 characters")
        .optional()
        .nullable(),

    city: z
        .string()
        .max(100, "City must be less than 100 characters")
        .optional()
        .nullable(),

    district: z
        .string()
        .max(100, "District must be less than 100 characters")
        .optional()
        .nullable(),

    state: z
        .string()
        .max(100, "State must be less than 100 characters")
        .optional()
        .nullable(),

    pincode: z
        .string()
        .length(6, "Pincode must be exactly 6 digits")
        .regex(/^\d{6}$/, "Pincode must contain only numbers")
        .optional()
        .nullable(),

    country: z
        .string()
        .max(100, "Country must be less than 100 characters")
        .optional()
        .nullable()
});

const verifyOtpSchema = z.object({
    userId: z.coerce.number().int().positive(),

    otp: z
        .string()
        .length(6, "OTP must be exactly 6 digits")
        .regex(/^\d{6}$/, "OTP must contain only numbers"),

    type: z.enum(["email", "phone"])
});

const loginSchema = z.object({
    email: z
        .string()
        .email("Enter a valid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
});

const sanitizeInput = (data) => {
    return {
        ...data,
        name: data.name?.trim(),
        email: data.email?.trim().toLowerCase(),
        phone: data.phone?.trim()
    };
};

module.exports = {
    registerSchema,
    verifyOtpSchema,
    loginSchema,
    sanitizeInput
};

===============================
FILE: server\src\modules\clinic\controllers\clinic.controller.js
===============================

const {
  createClinicAppointment,
  getMyClinicAppointments,
} = require("../models/clinic.model");

const generateReceiptId = () => {
  return `WIC-${Date.now()}`;
};

const bookClinicAppointmentController = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const appointmentData = {
      ...req.body,
      user_id: userId,
      receipt_id: generateReceiptId(),
    };

    const appointmentId = await createClinicAppointment(appointmentData);

    return res.status(201).json({
      success: true,
      message: "Walk-in centre appointment booked successfully",
      data: {
        appointmentId,
        receiptId: appointmentData.receipt_id,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMyClinicAppointmentsController = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const appointments = await getMyClinicAppointments(userId);

    return res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  bookClinicAppointmentController,
  getMyClinicAppointmentsController,
};

===============================
FILE: server\src\modules\clinic\models\clinic.model.js
===============================

const db = require("../../../config/db");

const createClinicAppointment = async (data) => {
  const {
    receipt_id,
    user_id,
    patient_name,
    patient_age,
    patient_gender,
    patient_mobile,
    patient_email,
    patient_address,
    clinic_branch,
    appointment_date,
    time_slot,
    consultation_fee,
  } = data;

  const [result] = await db.query(
    `
    INSERT INTO clinic_appointments
    (
      receipt_id,
      user_id,
      patient_name,
      patient_age,
      patient_gender,
      patient_mobile,
      patient_email,
      patient_address,
      clinic_branch,
      appointment_date,
      time_slot,
      consultation_fee
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      receipt_id,
      user_id,
      patient_name,
      patient_age,
      patient_gender,
      patient_mobile,
      patient_email,
      patient_address,
      clinic_branch,
      appointment_date,
      time_slot,
      consultation_fee,
    ]
  );

  return result.insertId;
};

const getMyClinicAppointments = async (userId) => {
  const [rows] = await db.query(
    `
    SELECT
      id,
      receipt_id,
      patient_name,
      patient_age,
      patient_gender,
      patient_mobile,
      patient_email,
      patient_address,
      clinic_branch,
      appointment_date,
      time_slot,
      consultation_fee,
      status,
      created_at
    FROM clinic_appointments
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return rows;
};

module.exports = {
  createClinicAppointment,
  getMyClinicAppointments,
};

===============================
FILE: server\src\modules\clinic\routes\clinic.routes.js
===============================

const express = require("express");

const {
  bookClinicAppointmentController,
  getMyClinicAppointmentsController,
} = require("../controllers/clinic.controller");

const { authenticate } = require("../../auth/middleware/auth.middleware");
const {
  validateClinicAppointment,
} = require("../validators/clinic.validator");

const router = express.Router();

router.post(
  "/book",
  authenticate,
  validateClinicAppointment,
  bookClinicAppointmentController
);

router.get("/my-appointments", authenticate, getMyClinicAppointmentsController);

module.exports = router;

===============================
FILE: server\src\modules\clinic\validators\clinic.validator.js
===============================

const validateClinicAppointment = (req, res, next) => {
  const {
    patient_name,
    patient_age,
    patient_gender,
    patient_mobile,
    patient_email,
    patient_address,
    clinic_branch,
    appointment_date,
    time_slot,
    consultation_fee,
  } = req.body;

  if (
    !patient_name ||
    !patient_age ||
    !patient_gender ||
    !patient_mobile ||
    !patient_email ||
    !patient_address ||
    !clinic_branch ||
    !appointment_date ||
    !time_slot ||
    !consultation_fee
  ) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided",
    });
  }

  next();
};

module.exports = {
  validateClinicAppointment,
};

===============================
FILE: server\src\modules\consultancyHome\controllers\consultancyHome.controller.js
===============================

const model = require("../models/consultancyHome.model");

async function getServices(req, res, next) {
  try {
    const services = await model.getActiveServices();
    res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
}

async function getMe(req, res, next) {
  try {
    const patient = await model.getPatientDetails(req.user.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient details not found"
      });
    }

    res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
}

async function getSlots(req, res, next) {
  try {
    const { date } = req.query;

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        success: false,
        message: "Valid date is required"
      });
    }

    const bookedSlots = await model.getBookedSlots(date);

    res.json({
      success: true,
      data: model.ALLOWED_SLOTS.map((slot) => ({
        slot,
        isBooked: bookedSlots.includes(slot)
      }))
    });
  } catch (error) {
    next(error);
  }
}

async function createBooking(req, res, next) {
  try {
    const booking = await model.createBooking({
      userId:          req.user.id,
      appointmentDate: req.body.appointmentDate,
      timeSlot:        req.body.timeSlot,
      serviceIds:      req.body.serviceIds,
      // ✅ Pass through overrides from frontend
      overridePhone:   req.body.phone,
      overrideAddress: req.body.address,
    });

    res.status(201).json({
      success: true,
      message: "Consultancy at home booking created successfully",
      data: booking
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getServices,
  getMe,
  getSlots,
  createBooking
};

===============================
FILE: server\src\modules\consultancyHome\models\consultancyHome.model.js
===============================

const crypto = require("crypto");
const db = require("../../../config/db");

const ALLOWED_SLOTS = [
  "09 AM - 10 AM",
  "10 AM - 11 AM",
  "11 AM - 12 PM",
  "12 PM - 01 PM",
  "02 PM - 03 PM",
  "03 PM - 04 PM",
  "04 PM - 05 PM",
  "05 PM - 06 PM",
];

function makeReceiptId() {
  return `CH${Date.now()}${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function makeError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.status = statusCode;
  return error;
}

function isPastDate(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = new Date(`${dateStr}T00:00:00`);
  return selected < today;
}

function cleanServiceIds(serviceIds) {
  if (!Array.isArray(serviceIds)) return [];

  return [...new Set(serviceIds.map(Number))].filter(
    (id) => Number.isInteger(id) && id > 0
  );
}

async function getActiveServices() {
  const [rows] = await db.execute(
    `
    SELECT
      id,
      service_code,
      service_name,
      service_group,
      description,
      price
    FROM consultancy_home_services
    WHERE is_active = TRUE
    ORDER BY sort_order ASC, id ASC
    `
  );

  return rows.map((row) => ({
    ...row,
    price: Number(row.price || 0),
  }));
}

async function getPatientDetails(userId) {
  const [rows] = await db.execute(
    `
    SELECT
      id,
      public_user_id,
      name,
      phone,
      email,
      role,
      CONCAT_WS(', ',
        NULLIF(address, ''),
        NULLIF(city, ''),
        NULLIF(district, ''),
        NULLIF(state, ''),
        NULLIF(pincode, ''),
        NULLIF(country, '')
      ) AS address
    FROM users
    WHERE id = ?
      AND role = 'patient'
    LIMIT 1
    `,
    [userId]
  );

  return rows[0];
}

async function getBookedSlots(appointmentDate) {
  const [rows] = await db.execute(
    `
    SELECT time_slot
    FROM consultancy_home_bookings
    WHERE appointment_date = ?
      AND booking_status IN ('pending', 'confirmed')
    `,
    [appointmentDate]
  );

  return rows.map((row) => row.time_slot);
}

async function getServicesByIds(serviceIds) {
  const cleanIds = cleanServiceIds(serviceIds);

  if (cleanIds.length === 0) return [];

  const placeholders = cleanIds.map(() => "?").join(",");

  const [rows] = await db.execute(
    `
    SELECT
      id,
      service_name,
      price
    FROM consultancy_home_services
    WHERE is_active = TRUE
      AND id IN (${placeholders})
    `,
    cleanIds
  );

  return rows.map((row) => ({
    ...row,
    price: Number(row.price || 0),
  }));
}

async function createBooking({ userId, appointmentDate, timeSlot, serviceIds }) {
  if (!userId) {
    throw makeError("User not authenticated", 401);
  }

  if (isPastDate(appointmentDate)) {
    throw makeError("Previous dates are not allowed", 400);
  }

  if (!ALLOWED_SLOTS.includes(timeSlot)) {
    throw makeError("Invalid time slot", 400);
  }

  const uniqueServiceIds = cleanServiceIds(serviceIds);

  if (uniqueServiceIds.length === 0) {
    throw makeError("Select at least one service", 400);
  }

  const patient = await getPatientDetails(userId);

  if (!patient) {
    throw makeError("Only patient accounts can book Consultation at Home", 403);
  }

  if (!patient.public_user_id) {
    throw makeError("Patient public ID is missing. Please verify your account.", 400);
  }

  if (!patient.address || patient.address.trim().length < 8) {
    throw makeError("Patient address is required", 400);
  }

  const bookedSlots = await getBookedSlots(appointmentDate);

  if (bookedSlots.includes(timeSlot)) {
    throw makeError("This slot is already booked", 409);
  }

  const services = await getServicesByIds(uniqueServiceIds);

  if (services.length !== uniqueServiceIds.length) {
    throw makeError("Invalid selected service", 400);
  }

  const totalAmount = services.reduce(
    (sum, service) => sum + Number(service.price || 0),
    0
  );

  const receiptId = makeReceiptId();
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [bookingResult] = await connection.execute(
      `
      INSERT INTO consultancy_home_bookings
      (
        receipt_id,
        user_id,
        patient_public_id,
        patient_name,
        patient_phone,
        patient_email,
        patient_address,
        appointment_date,
        time_slot,
        total_amount
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        receiptId,
        patient.id,
        patient.public_user_id,
        patient.name,
        patient.phone,
        patient.email,
        patient.address,
        appointmentDate,
        timeSlot,
        totalAmount,
      ]
    );

    const bookingId = bookingResult.insertId;

    for (const service of services) {
      await connection.execute(
        `
        INSERT INTO consultancy_home_booking_items
        (
          booking_id,
          service_id,
          service_name,
          price,
          quantity,
          line_total
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          bookingId,
          service.id,
          service.service_name,
          service.price,
          1,
          service.price,
        ]
      );
    }

    await connection.commit();

    return getBookingById(bookingId, userId);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function getBookingById(bookingId, userId) {
  const [bookings] = await db.execute(
    `
    SELECT *
    FROM consultancy_home_bookings
    WHERE id = ?
      AND user_id = ?
    LIMIT 1
    `,
    [bookingId, userId]
  );

  if (!bookings[0]) return null;

  const [items] = await db.execute(
    `
    SELECT
      service_name,
      price,
      quantity,
      line_total
    FROM consultancy_home_booking_items
    WHERE booking_id = ?
    `,
    [bookingId]
  );

  return {
    ...bookings[0],
    total_amount: Number(bookings[0].total_amount || 0),
    items: items.map((item) => ({
      ...item,
      price: Number(item.price || 0),
      line_total: Number(item.line_total || 0),
    })),
  };
}

module.exports = {
  ALLOWED_SLOTS,
  getActiveServices,
  getPatientDetails,
  getBookedSlots,
  createBooking,
  getBookingById,
};

===============================
FILE: server\src\modules\consultancyHome\routes\consultancyHome.routes.js
===============================

const express = require("express");
const router = express.Router();

const { authenticate } = require("../../auth/middleware/auth.middleware");
const controller = require("../controllers/consultancyHome.controller");
const { validateCreateBooking } = require("../validators/consultancyHome.validator");

router.get("/services", authenticate, controller.getServices);
router.get("/me", authenticate, controller.getMe);
router.get("/slots", authenticate, controller.getSlots);
router.post(
  "/bookings",
  authenticate,
  validateCreateBooking,
  controller.createBooking
);

module.exports = router;

===============================
FILE: server\src\modules\consultancyHome\validators\consultancyHome.validator.js
===============================

const { z } = require("zod");

const createConsultancyHomeBookingSchema = z.object({
  appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.string().min(5).max(50),
  serviceIds: z.array(z.number().int().positive()).min(1),
  // ✅ Added: allow frontend to override phone & address
  phone:   z.string().min(10).max(15).optional(),
  address: z.string().min(8).max(500).optional(),
});

function validateCreateBooking(req, res, next) {
  const parsed = createConsultancyHomeBookingSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid booking details",
      errors: parsed.error.flatten()
    });
  }

  req.body = parsed.data;
  next();
}

module.exports = { validateCreateBooking };

===============================
FILE: server\src\modules\homeService\controllers\homeService.controller.js
===============================

const asyncHandler = require("../../../shared/utils/asyncHandler");
const { successResponse } = require("../../../shared/utils/response");

const {
  getHomeServiceTests,
} = require("../models/homeService.model");

const listHomeServiceTestsController = asyncHandler(async (req, res) => {
  const tests = await getHomeServiceTests();

  return successResponse({
    res,
    status: 200,
    message: "Home service tests retrieved successfully",
    data: tests,
  });
});

module.exports = {
  listHomeServiceTestsController,
};

===============================
FILE: server\src\modules\homeService\controllers\homeServiceBooking.controller.js
===============================

const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const asyncHandler = require("../../../shared/utils/asyncHandler");
const AppError = require("../../../shared/utils/AppError");
const { successResponse } = require("../../../shared/utils/response");

const {
  getActiveHomeServiceTestsByIds,
} = require("../models/homeService.model");

const {
  createHomeServiceBooking,
  getPhleboHomeServiceBookings,
} = require("../models/homeServiceBooking.model");

function saveBase64Prescription(base64File) {
  if (!base64File) return null;

  const matches = base64File.match(
    /^data:(image\/png|image\/jpeg|application\/pdf);base64,(.+)$/
  );

  if (!matches) {
    throw new AppError("Invalid prescription file format", 400);
  }

  const mimeType = matches[1];
  const base64Data = matches[2];

  const buffer = Buffer.from(base64Data, "base64");

  if (buffer.length > 5 * 1024 * 1024) {
    throw new AppError("Prescription file must be less than 5 MB", 400);
  }

  const extension =
    mimeType === "image/png"
      ? "png"
      : mimeType === "image/jpeg"
      ? "jpg"
      : "pdf";

  const uploadDir = path.join(__dirname, "../../../../uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `${crypto.randomUUID()}.${extension}`;
  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, buffer);

  return `/uploads/${fileName}`;
}

function isValidMobile(mobile) {
  return /^[6-9]\d{9}$/.test(String(mobile || ""));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
}

const bookHomeServiceController = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (req.user.role !== "patient") {
    throw new AppError("Only patients can book home service tests", 403);
  }

  const {
    patientName,
    patientAge,
    patientSex,
    patientMobile,
    patientEmail,
    patientAddress,
    branch,
    tests,
    collectionDate,
    timeSlot,
    prescription,
  } = req.body;

  if (
    !patientName ||
    !patientAge ||
    !patientSex ||
    !patientMobile ||
    !patientEmail ||
    !patientAddress ||
    !branch ||
    !collectionDate ||
    !timeSlot
  ) {
    throw new AppError("Missing required booking fields", 400);
  }

  const age = Number(patientAge);

  if (!Number.isInteger(age) || age < 1 || age > 120) {
    throw new AppError("Enter valid patient age", 400);
  }

  if (!["Male", "Female", "Other"].includes(patientSex)) {
    throw new AppError("Invalid patient gender", 400);
  }

  if (!isValidMobile(patientMobile)) {
    throw new AppError("Invalid mobile number", 400);
  }

  if (!isValidEmail(patientEmail)) {
    throw new AppError("Invalid email address", 400);
  }

  if (!Array.isArray(tests) || tests.length === 0) {
    throw new AppError("Please select at least one test", 400);
  }

  if (tests.length > 2) {
    throw new AppError("Maximum 2 tests allowed per booking", 400);
  }

  const requestedTestIds = tests.map((test) => test.id);

  const dbTests = await getActiveHomeServiceTestsByIds(requestedTestIds);

  if (dbTests.length !== requestedTestIds.length) {
    throw new AppError("One or more selected tests are invalid", 400);
  }

  const totalAmount = dbTests.reduce(
    (sum, test) => sum + Number(test.price || 0),
    0
  );

  const prescriptionPath = saveBase64Prescription(prescription);

  const booking = await createHomeServiceBooking({
    userId,
    patientName: patientName.trim(),
    patientAge: age,
    patientSex,
    patientMobile: patientMobile.trim(),
    patientEmail: patientEmail.trim().toLowerCase(),
    patientAddress: patientAddress.trim(),
    branch,
    tests: dbTests,
    collectionDate,
    timeSlot,
    prescriptionPath,
    totalAmount,
    status: "pending",
  });

  return successResponse({
    res,
    status: 201,
    message: "Home service booking created successfully",
    data: booking,
  });
});

const listPhleboHomeServiceBookingsController = asyncHandler(async (req, res) => {
  if (req.user.role !== "phlebo") {
    throw new AppError("Only phlebos can access home service bookings", 403);
  }

  const bookings = await getPhleboHomeServiceBookings(req.user.id);

  return successResponse({
    res,
    status: 200,
    message: "Phlebo home service bookings retrieved successfully",
    data: bookings,
  });
});

module.exports = {
  bookHomeServiceController,
  listPhleboHomeServiceBookingsController,
};

===============================
FILE: server\src\modules\homeService\models\homeService.model.js
===============================

const db = require("../../../config/db");

function parseJsonArray(value) {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const getHomeServiceTests = async () => {
  const [rows] = await db.execute(
    `
    SELECT
      c.id AS category_id,
      c.category_name,
      c.category_code,
      c.icon AS category_icon,

      t.id AS test_id,
      t.test_code,
      t.test_name,
      t.subtitle,
      t.sample_type,
      t.icon AS test_icon,
      t.price,
      t.old_price,
      t.features,
      t.instructions,
      t.is_prescription_required,
      t.fasting_required,
      t.fasting_hours
    FROM home_service_categories c
    INNER JOIN home_service_tests t
      ON t.category_id = c.id
    WHERE c.is_active = TRUE
      AND t.is_active = TRUE
      AND t.is_home_collection_available = TRUE
    ORDER BY c.id ASC, t.test_name ASC
    `
  );

  const grouped = new Map();

  rows.forEach((row) => {
    if (!grouped.has(row.category_id)) {
      grouped.set(row.category_id, {
        category_id: row.category_id,
        category_name: row.category_name,
        category_code: row.category_code,
        icon: row.category_icon,
        tests: [],
      });
    }

    grouped.get(row.category_id).tests.push({
      id: row.test_id,
      code: row.test_code,
      name: row.test_name,
      subtitle: row.subtitle || "",
      sample_type: row.sample_type || "Blood",
      icon: row.test_icon || "🧪",
      price: Number(row.price || 0),
      old_price: Number(row.old_price || 0),
      features: parseJsonArray(row.features),
      instructions: parseJsonArray(row.instructions),
      is_prescription_required: Boolean(row.is_prescription_required),
      fasting_required: Boolean(row.fasting_required),
      fasting_hours: Number(row.fasting_hours || 0),
    });
  });

  return Array.from(grouped.values());
};

const getActiveHomeServiceTestsByIds = async (testIds) => {
  if (!Array.isArray(testIds) || testIds.length === 0) return [];

  const cleanIds = testIds
    .map((id) => Number(id))
    .filter((id) => Number.isInteger(id) && id > 0);

  if (cleanIds.length === 0) return [];

  const placeholders = cleanIds.map(() => "?").join(",");

  const [rows] = await db.execute(
    `
    SELECT
      c.category_name,

      t.id AS test_id,
      t.test_code,
      t.test_name,
      t.subtitle,
      t.sample_type,
      t.icon AS test_icon,
      t.price,
      t.old_price,
      t.features,
      t.instructions,
      t.is_prescription_required,
      t.fasting_required,
      t.fasting_hours
    FROM home_service_tests t
    INNER JOIN home_service_categories c
      ON c.id = t.category_id
    WHERE t.id IN (${placeholders})
      AND t.is_active = TRUE
      AND c.is_active = TRUE
      AND t.is_home_collection_available = TRUE
    `,
    cleanIds
  );

  return rows.map((row) => ({
    id: row.test_id,
    code: row.test_code,
    name: row.test_name,
    subtitle: row.subtitle || "",
    sampleType: row.sample_type || "Blood",
    category: row.category_name,
    icon: row.test_icon || "🧪",
    price: Number(row.price || 0),
    oldPrice: Number(row.old_price || 0),
    features: parseJsonArray(row.features),
    instructions: parseJsonArray(row.instructions),
    isPrescriptionRequired: Boolean(row.is_prescription_required),
    fastingRequired: Boolean(row.fasting_required),
    fastingHours: Number(row.fasting_hours || 0),
  }));
};

module.exports = {
  getHomeServiceTests,
  getActiveHomeServiceTestsByIds,
};

===============================
FILE: server\src\modules\homeService\models\homeServiceBooking.model.js
===============================

const crypto = require("crypto");
const db = require("../../../config/db");

function generatePublicBookingId() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const random = crypto.randomBytes(3).toString("hex").toUpperCase();

  return `HS${year}${month}${day}${random}`;
}

const createHomeServiceBooking = async (bookingData) => {
  const publicBookingId = generatePublicBookingId();

  const testsJson = Array.isArray(bookingData.tests)
    ? JSON.stringify(bookingData.tests)
    : JSON.stringify([]);

  const [result] = await db.execute(
    `
    INSERT INTO home_service_bookings (
      public_booking_id,
      user_id,
      patient_name,
      patient_age,
      patient_sex,
      patient_mobile,
      patient_email,
      patient_address,
      branch,
      tests,
      collection_date,
      time_slot,
      prescription_path,
      total_amount,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      publicBookingId,
      bookingData.userId,
      bookingData.patientName,
      bookingData.patientAge,
      bookingData.patientSex,
      bookingData.patientMobile,
      bookingData.patientEmail,
      bookingData.patientAddress,
      bookingData.branch,
      testsJson,
      bookingData.collectionDate,
      bookingData.timeSlot,
      bookingData.prescriptionPath || null,
      bookingData.totalAmount,
      bookingData.status || "pending",
    ]
  );

  return {
    id: result.insertId,
    publicBookingId,
    ...bookingData,
  };
};

const getPhleboHomeServiceBookings = async (phleboUserId) => {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM home_service_bookings
    WHERE assigned_phlebo_id = ?
    ORDER BY collection_date ASC, created_at DESC
    `,
    [phleboUserId]
  );

  return rows;
};

module.exports = {
  createHomeServiceBooking,
  getPhleboHomeServiceBookings,
};

===============================
FILE: server\src\modules\homeService\routes\homeService.routes.js
===============================

const express = require("express");

const {
  listHomeServiceTestsController,
} = require("../controllers/homeService.controller");

const {
  bookHomeServiceController,
  listPhleboHomeServiceBookingsController,
} = require("../controllers/homeServiceBooking.controller");

const { authenticate } = require("../../auth/middleware/auth.middleware");

const router = express.Router();

router.get("/tests", listHomeServiceTestsController);

router.post("/book", authenticate, bookHomeServiceController);

router.get(
  "/phlebo/bookings",
  authenticate,
  listPhleboHomeServiceBookingsController
);

module.exports = router;

===============================
FILE: server\src\modules\pharmacy\controllers\pharmacy.controller.js
===============================

const asyncHandler = require("../../../shared/utils/asyncHandler");
const AppError = require("../../../shared/utils/AppError");
const { successResponse } = require("../../../shared/utils/response");

const {
  getPatientDetailsByUserId,
  searchMedicines,
  createPharmacyOrder,
  getMyPharmacyOrders,
} = require("../models/pharmacy.model");

const {
  pharmacyOrderSchema,
  sanitizeSearch,
} = require("../validators/pharmacy.validator");

function ensureVerifiedPatient(user) {
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.role !== "patient") {
    throw new AppError("Only patient accounts can book medicines", 403);
  }

  if (!user.is_email_verified) {
    throw new AppError("Please verify your email before booking medicines", 403);
  }

  if (user.registration_status !== "PROFILE_COMPLETED") {
    throw new AppError("Please complete patient profile before booking medicines", 403);
  }
}

const getPharmacyPatientDetailsController = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  const user = await getPatientDetailsByUserId(userId);

  ensureVerifiedPatient(user);

  return successResponse({
    res,
    status: 200,
    message: "Patient details retrieved successfully",
    data: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      pincode: user.pincode || "",
      publicUserId: user.public_user_id,
    },
  });
});

const searchPharmacyMedicinesController = asyncHandler(async (req, res) => {
  const search = sanitizeSearch(req.query.search || "");

  const medicines = await searchMedicines(search);

  return successResponse({
    res,
    status: 200,
    message: "Medicines retrieved successfully",
    data: medicines,
  });
});

const createPharmacyOrderController = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  const user = await getPatientDetailsByUserId(userId);

  ensureVerifiedPatient(user);

  const validated = pharmacyOrderSchema.parse(req.body);

  const order = await createPharmacyOrder({
    userId,
    orderMode: validated.orderMode,
    patientName: validated.deliveryName.trim(),
    patientEmail: user.email,
    patientPhone: validated.deliveryPhone.trim(),
    deliveryAddress: validated.deliveryAddress.trim(),
    city: validated.city || null,
    state: validated.state || null,
    pincode: validated.pincode || null,
    items: validated.items,
  });

  return successResponse({
    res,
    status: 201,
    message:
      validated.orderMode === "online"
        ? "Medicine delivery booked successfully"
        : "Offline medicine pickup confirmed successfully",
    data: order,
  });
});

const getMyPharmacyOrdersController = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  if (req.user.role !== "patient") {
    throw new AppError("Only patients can view medicine orders", 403);
  }

  const orders = await getMyPharmacyOrders(userId);

  return successResponse({
    res,
    status: 200,
    message: "Medicine orders retrieved successfully",
    data: orders,
  });
});

module.exports = {
  getPharmacyPatientDetailsController,
  searchPharmacyMedicinesController,
  createPharmacyOrderController,
  getMyPharmacyOrdersController,
};

===============================
FILE: server\src\modules\pharmacy\controllers\pharmacyDashboard.controller.js
===============================

const asyncHandler = require("../../../shared/utils/asyncHandler");
const AppError = require("../../../shared/utils/AppError");
const { successResponse } = require("../../../shared/utils/response");

const {
  getPharmacyDashboardProfile,
  searchPharmacyInventory,
  getAllPharmacyOrders,
  updatePharmacyOrderStatus,
} = require("../models/pharmacyDashboard.model");

function ensurePharmacyUser(req) {
  if (!req.user) {
    throw new AppError("User not authenticated", 401);
  }

  if (req.user.role !== "pharmacy") {
    throw new AppError("Only pharmacy users can access this dashboard", 403);
  }
}

const getPharmacyDashboardProfileController = asyncHandler(async (req, res) => {
  ensurePharmacyUser(req);

  const profile = await getPharmacyDashboardProfile(req.user.id);

  if (!profile) {
    throw new AppError("Pharmacy profile not found", 404);
  }

  return successResponse({
    res,
    status: 200,
    message: "Pharmacy profile retrieved successfully",
    data: {
      publicUserId: profile.public_user_id,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      role: profile.role,

      pharmacyName: profile.pharmacy_name || "",
      pharmacyType: profile.pharmacy_type || "",
      ownerName: profile.owner_name || "",
      pharmacistInCharge: profile.pharmacist_in_charge || "",
      drugLicenseNumber: profile.drug_license_number || "",
      gstNumber: profile.gst_number || "",
      operatingHours: profile.operating_hours || "",
      homeDelivery: Boolean(profile.home_delivery),
      availability24x7: Boolean(profile.availability_24x7),
    },
  });
});

const getPharmacyInventoryController = asyncHandler(async (req, res) => {
  ensurePharmacyUser(req);

  const search = String(req.query.search || "")
    .trim()
    .replace(/[<>]/g, "")
    .slice(0, 100);

  const inventory = await searchPharmacyInventory(search);

  return successResponse({
    res,
    status: 200,
    message: "Inventory retrieved successfully",
    data: inventory,
  });
});

const getPharmacyOrdersController = asyncHandler(async (req, res) => {
  ensurePharmacyUser(req);

  const orders = await getAllPharmacyOrders();

  return successResponse({
    res,
    status: 200,
    message: "Pharmacy orders retrieved successfully",
    data: orders,
  });
});

const updatePharmacyOrderStatusController = asyncHandler(async (req, res) => {
  ensurePharmacyUser(req);

  const orderId = Number(req.params.orderId);
  const status = String(req.body.status || "").trim().toLowerCase();

  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw new AppError("Invalid order ID", 400);
  }

  if (status !== "completed" && status !== "cancelled") {
    throw new AppError("Invalid order status", 400);
  }

  const updated = await updatePharmacyOrderStatus(orderId, status);

  if (!updated) {
    throw new AppError("Order not found", 404);
  }

  return successResponse({
    res,
    status: 200,
    message:
      status === "completed"
        ? "Order marked as completed"
        : "Order cancelled successfully",
    data: {
      orderId,
      status,
    },
  });
});

module.exports = {
  getPharmacyDashboardProfileController,
  getPharmacyInventoryController,
  getPharmacyOrdersController,
  updatePharmacyOrderStatusController,
};

===============================
FILE: server\src\modules\pharmacy\models\pharmacy.model.js
===============================

const crypto = require("crypto");
const db = require("../../../config/db");

function generatePublicOrderId() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const random = crypto.randomBytes(3).toString("hex").toUpperCase();

  return `PH${year}${month}${day}${random}`;
}

const getPatientDetailsByUserId = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT
      id,
      public_user_id,
      name,
      email,
      phone,
      role,
      is_email_verified,
      is_phone_verified,
      registration_status,
      address,
      city,
      district,
      state,
      pincode,
      country
    FROM users
    WHERE id = ?
    LIMIT 1
    `,
    [userId]
  );

  return rows[0];
};

const searchMedicines = async (search) => {
  const query = `%${search}%`;

  const [rows] = await db.execute(
    `
    SELECT
      id,
      medicine_name,
      medicine_type,
      price,
      stock_quantity,
      requires_prescription
    FROM pharmacy_medicines
    WHERE is_active = TRUE
      AND stock_quantity > 0
      AND (
        medicine_name LIKE ?
        OR medicine_type LIKE ?
      )
    ORDER BY medicine_name ASC
    LIMIT 30
    `,
    [query, query]
  );

  return rows.map((row) => ({
    id: row.id,
    medicineName: row.medicine_name,
    medicineType: row.medicine_type,
    price: Number(row.price || 0),
    stockQuantity: Number(row.stock_quantity || 0),
    requiresPrescription: Boolean(row.requires_prescription),
  }));
};

const createPharmacyOrder = async ({
  userId,
  orderMode,
  patientName,
  patientEmail,
  patientPhone,
  deliveryAddress,
  city,
  state,
  pincode,
  items,
}) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const medicineIds = items.map((item) => item.medicineId);
    const placeholders = medicineIds.map(() => "?").join(",");

    const [medicineRows] = await connection.execute(
      `
      SELECT
        id,
        medicine_name,
        price,
        stock_quantity
      FROM pharmacy_medicines
      WHERE id IN (${placeholders})
        AND is_active = TRUE
      FOR UPDATE
      `,
      medicineIds
    );

    if (medicineRows.length !== medicineIds.length) {
      throw new Error("One or more medicines are invalid or unavailable");
    }

    const medicineMap = new Map();

    medicineRows.forEach((medicine) => {
      medicineMap.set(Number(medicine.id), medicine);
    });

    const orderItems = [];
    let subtotalAmount = 0;

    for (const item of items) {
      const medicine = medicineMap.get(Number(item.medicineId));

      if (!medicine) {
        throw new Error("Medicine not found");
      }

      const quantity = Number(item.quantity);

      if (quantity > Number(medicine.stock_quantity)) {
        throw new Error(
          `${medicine.medicine_name} has only ${medicine.stock_quantity} stock available`
        );
      }

      const unitPrice = Number(medicine.price);
      const totalPrice = unitPrice * quantity;

      subtotalAmount += totalPrice;

      orderItems.push({
        medicineId: medicine.id,
        medicineName: medicine.medicine_name,
        quantity,
        unitPrice,
        totalPrice,
      });
    }

    const deliveryCharge =
      orderMode === "online" && subtotalAmount < 500 ? 40 : 0;

    const totalAmount = subtotalAmount + deliveryCharge;
    const publicOrderId = generatePublicOrderId();

    const [orderResult] = await connection.execute(
      `
      INSERT INTO pharmacy_orders (
        public_order_id,
        user_id,
        order_mode,
        patient_name,
        patient_email,
        patient_phone,
        delivery_address,
        city,
        state,
        pincode,
        subtotal_amount,
        delivery_charge,
        total_amount,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        publicOrderId,
        userId,
        orderMode,
        patientName,
        patientEmail,
        patientPhone,
        deliveryAddress,
        city || null,
        state || null,
        pincode || null,
        subtotalAmount,
        deliveryCharge,
        totalAmount,
        "pending",
      ]
    );

    const orderId = orderResult.insertId;

    for (const orderItem of orderItems) {
      await connection.execute(
        `
        INSERT INTO pharmacy_order_items (
          order_id,
          medicine_id,
          medicine_name,
          quantity,
          unit_price,
          total_price
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          orderId,
          orderItem.medicineId,
          orderItem.medicineName,
          orderItem.quantity,
          orderItem.unitPrice,
          orderItem.totalPrice,
        ]
      );

      await connection.execute(
        `
        UPDATE pharmacy_medicines
        SET stock_quantity = stock_quantity - ?
        WHERE id = ?
        `,
        [orderItem.quantity, orderItem.medicineId]
      );
    }

    await connection.commit();

    return {
      id: orderId,
      publicOrderId,
      orderMode,
      items: orderItems,
      subtotalAmount,
      deliveryCharge,
      totalAmount,
      status: "pending",
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const getMyPharmacyOrders = async (userId) => {
  const [orders] = await db.execute(
    `
    SELECT
      id,
      public_order_id,
      order_mode,
      patient_name,
      patient_email,
      patient_phone,
      delivery_address,
      city,
      state,
      pincode,
      subtotal_amount,
      delivery_charge,
      total_amount,
      status,
      created_at
    FROM pharmacy_orders
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );

  if (orders.length === 0) {
    return [];
  }

  const orderIds = orders.map((order) => order.id);
  const placeholders = orderIds.map(() => "?").join(",");

  const [items] = await db.execute(
    `
    SELECT
      order_id,
      medicine_id,
      medicine_name,
      quantity,
      unit_price,
      total_price
    FROM pharmacy_order_items
    WHERE order_id IN (${placeholders})
    ORDER BY id ASC
    `,
    orderIds
  );

  const itemMap = new Map();

  items.forEach((item) => {
    if (!itemMap.has(item.order_id)) {
      itemMap.set(item.order_id, []);
    }

    itemMap.get(item.order_id).push({
      medicineId: item.medicine_id,
      medicineName: item.medicine_name,
      quantity: item.quantity,
      unitPrice: Number(item.unit_price),
      totalPrice: Number(item.total_price),
    });
  });

  return orders.map((order) => ({
    id: order.id,
    publicOrderId: order.public_order_id,
    orderMode: order.order_mode,
    patientName: order.patient_name,
    patientEmail: order.patient_email,
    patientPhone: order.patient_phone,
    deliveryAddress: order.delivery_address,
    city: order.city,
    state: order.state,
    pincode: order.pincode,
    subtotalAmount: Number(order.subtotal_amount),
    deliveryCharge: Number(order.delivery_charge),
    totalAmount: Number(order.total_amount),
    status: order.status,
    createdAt: order.created_at,
    items: itemMap.get(order.id) || [],
  }));
};

module.exports = {
  getPatientDetailsByUserId,
  searchMedicines,
  createPharmacyOrder,
  getMyPharmacyOrders,
};

===============================
FILE: server\src\modules\pharmacy\models\pharmacyDashboard.model.js
===============================

const db = require("../../../config/db");

const getPharmacyDashboardProfile = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT
      u.id,
      u.public_user_id,
      u.name,
      u.email,
      u.phone,
      u.role,

      p.pharmacy_name,
      p.pharmacy_type,
      p.owner_name,
      p.pharmacist_in_charge,
      p.drug_license_number,
      p.gst_number,
      p.operating_hours,
      p.home_delivery,
      p.availability_24x7
    FROM users u
    LEFT JOIN pharmacy_profiles p
      ON p.user_id = u.id
    WHERE u.id = ?
      AND u.role = 'pharmacy'
    LIMIT 1
    `,
    [userId]
  );

  return rows[0];
};

const searchPharmacyInventory = async (search = "") => {
  const query = `%${search}%`;

  const [rows] = await db.execute(
    `
    SELECT
      id,
      medicine_name,
      medicine_type,
      price,
      stock_quantity,
      requires_prescription
    FROM pharmacy_medicines
    WHERE medicine_name LIKE ?
       OR medicine_type LIKE ?
    ORDER BY medicine_name ASC
    LIMIT 100
    `,
    [query, query]
  );

  return rows.map((row) => ({
    id: row.id,
    medicineName: row.medicine_name,
    medicineType: row.medicine_type,
    price: Number(row.price || 0),
    stockQuantity: Number(row.stock_quantity || 0),
    requiresPrescription: Boolean(row.requires_prescription),
  }));
};

const getAllPharmacyOrders = async () => {
  const [orders] = await db.execute(
    `
    SELECT
      id,
      public_order_id,
      order_mode,
      patient_name,
      patient_email,
      patient_phone,
      delivery_address,
      city,
      state,
      pincode,
      subtotal_amount,
      delivery_charge,
      total_amount,
      status,
      created_at
    FROM pharmacy_orders
    ORDER BY created_at DESC
    `
  );

  if (orders.length === 0) {
    return [];
  }

  const orderIds = orders.map((order) => order.id);
  const placeholders = orderIds.map(() => "?").join(",");

  const [items] = await db.execute(
    `
    SELECT
      order_id,
      medicine_id,
      medicine_name,
      quantity,
      unit_price,
      total_price
    FROM pharmacy_order_items
    WHERE order_id IN (${placeholders})
    ORDER BY id ASC
    `,
    orderIds
  );

  const itemMap = new Map();

  items.forEach((item) => {
    if (!itemMap.has(item.order_id)) {
      itemMap.set(item.order_id, []);
    }

    itemMap.get(item.order_id).push({
      medicineId: item.medicine_id,
      medicineName: item.medicine_name,
      quantity: Number(item.quantity),
      unitPrice: Number(item.unit_price),
      totalPrice: Number(item.total_price),
    });
  });

  return orders.map((order) => ({
    id: order.id,
    publicOrderId: order.public_order_id,
    orderMode: order.order_mode,
    patientName: order.patient_name,
    patientEmail: order.patient_email,
    patientPhone: order.patient_phone,
    deliveryAddress: order.delivery_address,
    city: order.city,
    state: order.state,
    pincode: order.pincode,
    subtotalAmount: Number(order.subtotal_amount),
    deliveryCharge: Number(order.delivery_charge),
    totalAmount: Number(order.total_amount),
    status: order.status,
    createdAt: order.created_at,
    items: itemMap.get(order.id) || [],
  }));
};

const updatePharmacyOrderStatus = async (orderId, status) => {
  const [result] = await db.execute(
    `
    UPDATE pharmacy_orders
    SET status = ?
    WHERE id = ?
    `,
    [status, orderId]
  );

  return result.affectedRows > 0;
};

module.exports = {
  getPharmacyDashboardProfile,
  searchPharmacyInventory,
  getAllPharmacyOrders,
  updatePharmacyOrderStatus,
};

===============================
FILE: server\src\modules\pharmacy\routes\pharmacy.routes.js
===============================

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

===============================
FILE: server\src\modules\pharmacy\validators\pharmacy.validator.js
===============================

const { z } = require("zod");

const pharmacyOrderSchema = z.object({
  orderMode: z.enum(["online", "offline"], {
    errorMap: () => ({ message: "Invalid order mode" }),
  }),

  deliveryName: z
    .string()
    .min(3, "Name is required")
    .max(100, "Name is too long"),

  deliveryPhone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number"),

  deliveryAddress: z
    .string()
    .min(5, "Address is required")
    .max(1000, "Address is too long"),

  city: z
    .string()
    .max(100, "City is too long")
    .optional()
    .nullable(),

  state: z
    .string()
    .max(100, "State is too long")
    .optional()
    .nullable(),

  pincode: z
    .string()
    .regex(/^\d{6}$/, "Enter valid 6-digit pincode")
    .optional()
    .nullable(),

  items: z
    .array(
      z.object({
        medicineId: z.coerce.number().int().positive(),
        quantity: z.coerce.number().int().min(1).max(20),
      })
    )
    .min(1, "Select at least one medicine")
    .max(10, "Maximum 10 medicines allowed per order"),
});

const sanitizeSearch = (value) => {
  return String(value || "")
    .trim()
    .replace(/[<>]/g, "")
    .slice(0, 100);
};

module.exports = {
  pharmacyOrderSchema,
  sanitizeSearch,
};

===============================
FILE: server\src\modules\profile\controllers\profile.controller.js
===============================

const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const asyncHandler = require("../../../shared/utils/asyncHandler");
const { successResponse } = require("../../../shared/utils/response");
const {
  upsertProfile,
  findProfileByUserId,
  getPatientFullProfileByUserId,
  updatePatientFullProfileByUserId,
  findPatientBookingsByUserId,
  findPatientConsultationBookingsByUserId,
  findPatientClinicBookingsByUserId,
} = require("../models/profile.model");
const AppError = require("../../../shared/utils/AppError");

/**
 * Known profile fields that arrive as base64-encoded files.
 * These are saved to disk and their paths stored in the DB instead
 * of the raw base64 string (which would overflow VARCHAR columns).
 */
const FILE_FIELDS = new Set([
  // Phlebo
  "aadhaarFront",
  "phlebotomyCertificate",
  // Doctor
  "medicalCertificate",
  "medicalLicense",
  "idProof",
  // Pharmacy
  "drugLicenseDocument",
  "gstCertificate",
  "pharmacistCertificate",
  "ownerIdProof",
  // Organization
  "registrationCertificate",
  "governmentLicense",
  "authorizedPersonIdProof",
  // Admin
  "aadhaarUpload",
  "governmentIdProof",
  "pharmacyImages",
]);

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
]);

const EXTENSION_MAP = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "application/pdf": "pdf",
};

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Saves a base64-encoded file to the uploads directory.
 * Returns the server-relative path (e.g. /uploads/uuid.jpg).
 * Throws AppError on invalid format, unsupported type, or size limit exceeded.
 */
function saveBase64File(base64String, fieldName) {
  if (!base64String || typeof base64String !== "string") return null;

  // Accept both raw base64 and data-URI format
  const dataUriMatch = base64String.match(/^data:([^;]+);base64,(.+)$/);

  let mimeType;
  let rawBase64;

  if (dataUriMatch) {
    mimeType = dataUriMatch[1].toLowerCase();
    rawBase64 = dataUriMatch[2];
  } else {
    // Treat as raw base64 — default to JPEG so it still saves
    mimeType = "image/jpeg";
    rawBase64 = base64String;
  }

  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    throw new AppError(
      `Field "${fieldName}" has unsupported file type: ${mimeType}. Allowed: jpg, png, pdf.`,
      400
    );
  }

  const buffer = Buffer.from(rawBase64, "base64");

  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    throw new AppError(
      `Field "${fieldName}" exceeds the 5 MB size limit.`,
      400
    );
  }

  const ext = EXTENSION_MAP[mimeType];
  const uploadDir = path.join(__dirname, "../../../../../uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `${crypto.randomUUID()}.${ext}`;
  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, buffer);

  return `/uploads/${fileName}`;
}

/**
 * Iterates over profileData, detects base64 file fields, saves them
 * to disk, and replaces their values with the saved file path.
 */
function processFileFields(profileData) {
  const processed = { ...profileData };

  for (const key of FILE_FIELDS) {
    if (
      key in processed &&
      processed[key] &&
      typeof processed[key] === "string" &&
      processed[key].length > 255 // heuristic: real paths are short
    ) {
      processed[key] = saveBase64File(processed[key], key);
    }
  }

  return processed;
}

const onboardProfileController = asyncHandler(async (req, res) => {
  // Accept either JWT-authenticated user or userId/role passed in body
  // (during the initial register → OTP → onboard flow before a session exists)
  const userId = req.user?.id || req.body.userId;
  const role = req.user?.role || req.body.role;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  if (!role) {
    throw new AppError("User role is required", 400);
  }

  // Strip meta params so they don't leak into the profile table
  const { userId: _uid, role: _role, ...rawProfileData } = req.body;

  // Convert base64 file fields → file paths before hitting the DB
  const profileData = processFileFields(rawProfileData);

  await upsertProfile(userId, role, profileData);

  return successResponse({
    res,
    status: 200,
    message: "Profile onboarded successfully",
    data: {
      userId,
      role,
      registrationStatus: "PROFILE_COMPLETED",
    },
  });
});

const getProfileController = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const role = req.user?.role;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  const profile = await findProfileByUserId(userId, role);

  return successResponse({
    res,
    status: 200,
    message: "Profile retrieved successfully",
    data: profile,
  });
});
const allowedBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const allowedGenders = ["male", "female", "other"];

function calculateAgeFromDob(dob) {
  if (!dob) return null;

  const birthDate = new Date(dob);
  const today = new Date();

  if (Number.isNaN(birthDate.getTime())) return null;
  if (birthDate >= today) return null;

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age;
}

function parseMedicalHistory(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function formatDateForInput(value) {
  if (!value) return "";

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
function formatPatientProfile(row) {
  return {
    id: row.public_user_id,
    internalId: row.id,
    role: row.role,

    name: row.name || "",
    email: row.email || "",
    phone: row.phone || "",
    gender: row.gender || "",
    dob: formatDateForInput(row.dob),
    age: calculateAgeFromDob(row.dob),

    address: row.address || "",
    city: row.city || "",
    district: row.district || "",
    state: row.state || "",
    pincode: row.pincode || "",
    country: row.country || "India",

    bloodGroup: row.blood_group || "",
    height: row.height ? String(row.height) : "",
    weight: row.weight ? String(row.weight) : "",
    medicalHistory: parseMedicalHistory(row.medical_history),
    hasOtherCondition: Boolean(row.has_other_condition),
    otherCondition: row.other_condition || "",
    registrationStatus: row.registration_status,
  };
}

function validatePatientUpdate(data) {
  const name = String(data.name || "").trim();
  const phone = String(data.phone || "").trim();
  const email = String(data.email || "").trim().toLowerCase();
  const gender = String(data.gender || "").trim().toLowerCase();
  const dob = formatDateForInput(data.dob);
  const pincode = String(data.pincode || "").trim();
  const bloodGroup = String(data.bloodGroup || "").trim();

  const height =
    data.height === "" || data.height === null || data.height === undefined
      ? null
      : Number(data.height);

  const weight =
    data.weight === "" || data.weight === null || data.weight === undefined
      ? null
      : Number(data.weight);

  if (name.length < 3 || name.length > 100) {
    throw new AppError("Name must be between 3 and 100 characters", 400);
  }

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    throw new AppError("Name must contain only letters and spaces", 400);
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    throw new AppError("Enter a valid 10-digit Indian mobile number", 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppError("Enter a valid email address", 400);
  }

  if (gender && !allowedGenders.includes(gender)) {
    throw new AppError("Invalid gender selected", 400);
  }

  if (dob) {
    const age = calculateAgeFromDob(dob);

    if (age === null || age < 0 || age > 120) {
      throw new AppError("Enter a valid date of birth", 400);
    }
  }

  if (pincode && !/^\d{6}$/.test(pincode)) {
    throw new AppError("Enter a valid 6-digit pincode", 400);
  }

  if (bloodGroup && !allowedBloodGroups.includes(bloodGroup)) {
    throw new AppError("Invalid blood group selected", 400);
  }

  if (
    height !== null &&
    (!Number.isFinite(height) || height < 30 || height > 250)
  ) {
    throw new AppError("Height must be between 30 and 250 cm", 400);
  }

  if (
    weight !== null &&
    (!Number.isFinite(weight) || weight < 1 || weight > 300)
  ) {
    throw new AppError("Weight must be between 1 and 300 kg", 400);
  }

  return {
    name,
    phone,
    email,
    gender: gender || null,
    dob: dob || null,
    address: String(data.address || "").trim(),
    city: String(data.city || "").trim(),
    district: String(data.district || "").trim(),
    state: String(data.state || "").trim(),
    pincode: pincode || null,
    country: String(data.country || "India").trim(),

    bloodGroup: bloodGroup || null,
    height,
    weight,
    medicalHistory: Array.isArray(data.medicalHistory)
      ? data.medicalHistory
      : [],
    hasOtherCondition: Boolean(data.hasOtherCondition),
    otherCondition: String(data.otherCondition || "").trim(),
  };
}

const getPatientProfileController = asyncHandler(async (req, res) => {
  if (req.user.role !== "patient") {
    throw new AppError("Only patients can access patient profile", 403);
  }

  const profile = await getPatientFullProfileByUserId(req.user.id);

  if (!profile) {
    throw new AppError("Patient profile not found", 404);
  }

  return successResponse({
    res,
    status: 200,
    message: "Patient profile retrieved successfully",
    data: formatPatientProfile(profile),
  });
});

const updatePatientProfileController = asyncHandler(async (req, res) => {
  if (req.user.role !== "patient") {
    throw new AppError("Only patients can update patient profile", 403);
  }

  const validated = validatePatientUpdate(req.body);

  const updatedProfile = await updatePatientFullProfileByUserId(
    req.user.id,
    validated
  );

  return successResponse({
    res,
    status: 200,
    message: "Patient profile updated successfully",
    data: formatPatientProfile(updatedProfile),
  });
});
function parseScans(value) {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatBooking(row) {
  return {
    id: row.id,
    receiptId: row.receipt_id,
    patientName: row.patient_name,
    patientAge: row.patient_age,
    patientSex: row.patient_sex,
    patientMobile: row.patient_mobile,
    patientEmail: row.patient_email,
    patientAddress: row.patient_address,
    branch: row.branch,
    scans: parseScans(row.scans),
    appointmentDate: row.appointment_date
      ? String(row.appointment_date).slice(0, 10)
      : "",
    timeSlot: row.time_slot,
    prescriptionPath: row.prescription_path,
    totalAmount: Number(row.total_amount || 0),
    status: row.status,
    createdAt: row.created_at,
  };
}

const getPatientBookingsController = asyncHandler(async (req, res) => {
  if (req.user.role !== "patient") {
    throw new AppError("Only patients can view previous bookings", 403);
  }

  const scanBookings = await findPatientBookingsByUserId(req.user.id);

  const consultationBookings =
    await findPatientConsultationBookingsByUserId(req.user.id);

  const clinicBookings =
    await findPatientClinicBookingsByUserId(req.user.id);

  const allBookings = [
    ...scanBookings.map((booking) => ({
      ...formatBooking(booking),
      bookingType: "scan",
    })),

    ...consultationBookings.map((booking) => ({
      id: booking.id,
      receiptId: booking.receipt_id,
      bookingType: "consultation",

      patientName: booking.patient_name,
      patientMobile: booking.patient_phone,

      appointmentDate: booking.appointment_date,
      timeSlot: booking.time_slot,

      totalAmount: Number(booking.total_amount),
      status: booking.booking_status,

      branch: "Consultation at Home",
      scans: [],
    })),

    ...clinicBookings.map((booking) => ({
      id: booking.id,
      receiptId: booking.receipt_id,
      bookingType: "walkin",

      patientName: booking.patient_name,
      patientAge: booking.patient_age,
      patientSex: booking.patient_gender,
      patientMobile: booking.patient_mobile,
      patientEmail: booking.patient_email,
      patientAddress: booking.patient_address,

      appointmentDate: booking.appointment_date
        ? String(booking.appointment_date).slice(0, 10)
        : "",
      timeSlot: booking.time_slot,

      totalAmount: Number(booking.consultation_fee || 0),
      status: booking.status,

      branch: booking.clinic_branch,
      scans: [],
    })),
  ].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  return successResponse({
    res,
    status: 200,
    message: "Patient bookings retrieved successfully",
    data: allBookings,
  });
});
module.exports = {
  onboardProfileController,
  getProfileController,
  getPatientProfileController,
  updatePatientProfileController,
  getPatientBookingsController,
};

===============================
FILE: server\src\modules\profile\models\profile.model.js
===============================

const db = require("../../../config/db");

const getTableName = (role) => {
  switch (role) {
    case "patient":
      return "patient_profiles";
    case "doctor":
      return "doctor_profiles";
    case "phlebo":
    case "phlebotomist":
      return "phlebo_profiles";
    case "pharmacy":
      return "pharmacy_profiles";
    case "organization":
      return "organization_profiles";
    case "admin":
      return "admin_profiles";
    default:
      throw new Error(`Invalid role for onboarding: ${role}`);
  }
};

const mapCamelToSnake = (data, role) => {
  const mapped = {};

  const mappings = {
    // Patient
    bloodGroup: "blood_group",
    medicalHistory: "medical_history",
    otherCondition: "other_condition",

    // Doctor
    medicalLicenseNumber: "medical_license_number",
    hospitalOrClinicName: "hospital_clinic_name",
    consultationFee: "consultation_fee",
    availableTimings: "available_timings",
    consultationMode: "consultation_mode",
    availableForOnlineConsultation: "available_online",
    languagesKnown: "languages_known",
    medicalCertificate: "medical_certificate",
    medicalLicense: "medical_license",
    idProof: "id_proof",

    // Phlebotomist
    phleboType: "phlebo_type",
    certificationNumber: "certification_number",
    availableDays: "available_days",
    availableTime: "available_time",
    homeCollection: "home_collection",
    emergencyAvailability: "emergency_availability",
    governmentIdType: "government_id_type",
    aadhaarFront: "aadhaar_front",
    phlebotomyCertificate: "phlebotomy_certificate",

    // Pharmacy
    pharmacyName: "pharmacy_name",
    pharmacyType: "pharmacy_type",
    ownerName: "owner_name",
    pharmacistInCharge: "pharmacist_in_charge",
    yearsOfOperation: "years_of_operation",
    operatingHours: "operating_hours",
    registrationNumber: "registration_number",
    drugLicenseNumber: "drug_license_number",
    gstNumber: "gst_number",
    homeDeliveryAvailable: "home_delivery",
    emergencyServiceAvailable: "emergency_service",
    onlineConsultationSupport: "online_consultation",
    availability24x7: "availability_24x7",
    drugLicenseDocument: "drug_license_document",
    gstCertificate: "gst_certificate",
    pharmacistCertificate: "pharmacist_certificate",
    pharmacyImages: "pharmacy_images",
    ownerIdProof: "owner_id_proof",

    // Organization
    institutionName: "institution_name",
    institutionType: "institution_type",
    licenseNumber: "license_number",
    establishmentYear: "establishment_year",
    ownershipType: "ownership_type",
    altPhone: "alt_phone",
    emergencyPhone: "emergency_phone",
    headOfInstitution: "head_of_institution",
    totalDepartments: "total_departments",
    totalStaff: "total_staff",
    totalBranches: "total_branches",
    registrationCertificate: "registration_certificate",
    governmentLicense: "government_license",
    authorizedPersonIdProof: "authorized_person_id_proof",

    // Admin
    accessLevel: "access_level",
    officeLocation: "office_location",
    joiningDate: "joining_date",
    officialEmail: "official_email",
    alternatePhone: "alternate_phone",
    securityQuestion: "security_question",
    securityAnswer: "security_answer",
    twoFAEnabled: "two_fa_enabled",
    aadhaarUpload: "aadhaar_upload",
    governmentIdProof: "government_id_proof",
  };

  for (const key in data) {
    if (data[key] === undefined) continue;

    const dbKey = mappings[key] || key.replace(/([A-Z])/g, "_$1").toLowerCase();
    let val = data[key];

    if (
      ["medical_history", "languages_known", "available_days", "permissions"].includes(
        dbKey
      )
    ) {
      val = Array.isArray(val) ? JSON.stringify(val) : val;
    } else if (typeof val === "boolean") {
      val = val ? 1 : 0;
    } else if (val === "") {
      val = null;
    }

    mapped[dbKey] = val;
  }

  return mapped;
};

const upsertProfile = async (userId, role, profileData) => {
  const tableName = getTableName(role);
  const data = mapCamelToSnake(profileData, role);
  data.user_id = userId;

  const keys = Object.keys(data);
  const values = Object.values(data);

  const placeholders = keys.map(() => "?").join(", ");
  const updates = keys.map((key) => `${key} = VALUES(${key})`).join(", ");

  const query = `
    INSERT INTO ${tableName} (${keys.join(", ")})
    VALUES (${placeholders})
    ON DUPLICATE KEY UPDATE ${updates}
  `;

  const [result] = await db.execute(query, values);

  await db.execute(
    `UPDATE users SET registration_status = 'PROFILE_COMPLETED' WHERE id = ?`,
    [userId]
  );

  return result;
};

const findProfileByUserId = async (userId, role) => {
  const tableName = getTableName(role);

  const [rows] = await db.execute(
    `SELECT * FROM ${tableName} WHERE user_id = ? LIMIT 1`,
    [userId]
  );

  return rows[0];
};

const getPatientFullProfileByUserId = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT
      u.id,
      u.public_user_id,
      u.name,
      u.email,
      u.phone,
      u.role,
      u.gender,
      u.dob,
      u.address,
      u.city,
      u.district,
      u.state,
      u.pincode,
      u.country,
      u.registration_status,

      pp.blood_group,
      pp.height,
      pp.weight,
      pp.medical_history,
      pp.has_other_condition,
      pp.other_condition
    FROM users u
    LEFT JOIN patient_profiles pp
      ON pp.user_id = u.id
    WHERE u.id = ?
      AND u.role = 'patient'
    LIMIT 1
    `,
    [userId]
  );

  return rows[0];
};

const updatePatientFullProfileByUserId = async (userId, data) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute(
      `
      UPDATE users
      SET
        name = ?,
        phone = ?,
        email = ?,
        gender = ?,
        dob = ?,
        address = ?,
        city = ?,
        district = ?,
        state = ?,
        pincode = ?,
        country = ?
      WHERE id = ?
        AND role = 'patient'
      `,
      [
        data.name,
        data.phone,
        data.email,
        data.gender || null,
        data.dob || null,
        data.address || null,
        data.city || null,
        data.district || null,
        data.state || null,
        data.pincode || null,
        data.country || "India",
        userId,
      ]
    );

    const medicalHistoryJson = Array.isArray(data.medicalHistory)
      ? JSON.stringify(data.medicalHistory)
      : JSON.stringify([]);

    await connection.execute(
      `
      INSERT INTO patient_profiles (
        user_id,
        blood_group,
        height,
        weight,
        medical_history,
        has_other_condition,
        other_condition
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        blood_group = VALUES(blood_group),
        height = VALUES(height),
        weight = VALUES(weight),
        medical_history = VALUES(medical_history),
        has_other_condition = VALUES(has_other_condition),
        other_condition = VALUES(other_condition)
      `,
      [
        userId,
        data.bloodGroup || null,
        data.height || null,
        data.weight || null,
        medicalHistoryJson,
        data.hasOtherCondition ? 1 : 0,
        data.otherCondition || null,
      ]
    );

    await connection.commit();

    return getPatientFullProfileByUserId(userId);
  } catch (error) {
    await connection.rollback();

    if (error.code === "ER_DUP_ENTRY") {
      error.status = 409;
      error.message = "Email or phone number already exists";
    }

    throw error;
  } finally {
    connection.release();
  }
};

const findPatientBookingsByUserId = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT
      id,
      receipt_id,
      'Diagnostic Scan' AS booking_type,
      patient_name,
      patient_age,
      patient_sex,
      patient_mobile,
      patient_email,
      patient_address,
      branch,
      scans,
      appointment_date,
      time_slot,
      prescription_path,
      total_amount,
      status,
      created_at
    FROM appointments
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return rows;
};

const findPatientConsultationBookingsByUserId = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT
      id,
      receipt_id,
      'Consultation Home' AS booking_type,
      patient_name,
      NULL AS patient_age,
      NULL AS patient_sex,
      patient_phone AS patient_mobile,
      patient_email,
      patient_address,
      NULL AS branch,
      appointment_date,
      time_slot,
      total_amount,
      booking_status AS status,
      created_at
    FROM consultancy_home_bookings
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return rows;
};

const findPatientClinicBookingsByUserId = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT
      id,
      receipt_id,
      user_id,
      patient_name,
      patient_age,
      patient_gender,
      patient_mobile,
      patient_email,
      patient_address,
      clinic_branch,
      appointment_date,
      time_slot,
      consultation_fee,
      status,
      created_at
    FROM clinic_appointments
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return rows;
};
module.exports = {
  upsertProfile,
  findProfileByUserId,
  getPatientFullProfileByUserId,
  updatePatientFullProfileByUserId,
  findPatientBookingsByUserId,
  findPatientConsultationBookingsByUserId,
  findPatientClinicBookingsByUserId,

};

===============================
FILE: server\src\modules\profile\routes\profile.routes.js
===============================

const express = require("express");

const {
  onboardProfileController,
  getProfileController,
  getPatientProfileController,
  updatePatientProfileController,
  getPatientBookingsController,
} = require("../controllers/profile.controller");

const { authenticate } = require("../../auth/middleware/auth.middleware");

const router = express.Router();

/*
  Registration onboarding route

  This route is used immediately after OTP verification.
  At that time, user is not logged in yet, so it should not require JWT.
*/
router.post("/onboard", onboardProfileController);

/*
  Patient-only full profile routes

  GET  /api/profile/patient  -> fetch users + patient_profiles data
  PUT  /api/profile/patient  -> update users + patient_profiles data
*/
router.get("/patient", authenticate, getPatientProfileController);

router.put("/patient", authenticate, updatePatientProfileController);
router.get("/bookings", authenticate, getPatientBookingsController);
/*
  Existing generic profile route
*/
router.get("/", authenticate, getProfileController);

module.exports = router;

===============================
FILE: server\src\modules\teleConsultation\controllers\teleConsultation.controller.js
===============================

const crypto = require("crypto");

const {
  createBooking,
  getBookingsByUserId
} = require("../models/teleConsultation.model");

const bookTeleConsultation = async (req, res) => {

  const receiptId =
    "TC" +
    Date.now() +
    crypto.randomBytes(3).toString("hex").toUpperCase();

  const bookingId = await createBooking({
    receiptId,
    userId: req.user.id,
    ...req.body
  });

  return res.status(201).json({
    success: true,
    message: "Tele consultation booked successfully",
    data: {
      bookingId,
      receiptId
    }
  });
};

const getMyBookings = async (req, res) => {

  const bookings = await getBookingsByUserId(
    req.user.id
  );

  return res.status(200).json({
    success: true,
    data: bookings
  });
};

module.exports = {
  bookTeleConsultation,
  getMyBookings
};

===============================
FILE: server\src\modules\teleConsultation\models\teleConsultation.model.js
===============================

const db = require("../../../config/db");

const createBooking = async (data) => {
  const [result] = await db.execute(
    `
    INSERT INTO tele_consultation_bookings
    (
      receipt_id,
      user_id,

      patient_name,
      patient_age,
      patient_gender,

      patient_mobile,
      patient_email,
      patient_address,

      specialization,

      appointment_date,
      time_slot,

      consultation_fee
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.receiptId,
      data.userId,

      data.patientName,
      data.patientAge,
      data.patientGender,

      data.patientMobile,
      data.patientEmail,
      data.patientAddress,

      data.specialization,

      data.appointmentDate,
      data.timeSlot,

      data.consultationFee
    ]
  );

  return result.insertId;
};

const getBookingsByUserId = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM tele_consultation_bookings
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return rows;
};

module.exports = {
  createBooking,
  getBookingsByUserId
};

===============================
FILE: server\src\modules\teleConsultation\routes\teleConsultation.routes.js
===============================

const express = require("express");

const router = express.Router();

const { authenticate } =
require("../../auth/middleware/auth.middleware");

const {
  bookTeleConsultation,
  getMyBookings
} = require("../controllers/teleConsultation.controller");

router.post(
  "/book",
  authenticate,
  bookTeleConsultation
);

router.get(
  "/my-bookings",
  authenticate,
  getMyBookings
);

module.exports = router;

===============================
FILE: server\src\modules\teleConsultation\validators\teleConsultation.validator.js
===============================


===============================
FILE: server\src\modules\walkInCenters\controllers\walkInCenters.controller.js
===============================

const asyncHandler = require("../../../shared/utils/asyncHandler");
const AppError = require("../../../shared/utils/AppError");
const { successResponse } = require("../../../shared/utils/response");

const {
  getActiveHomeServiceTestsByIds,
} = require("../../homeService/models/homeService.model");

const {
  createWalkInCenterBooking,
} = require("../models/walkInCenters.model");

function isValidMobile(mobile) {
  return /^[6-9]\d{9}$/.test(String(mobile || ""));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
}

const bookWalkInCenterController = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (req.user.role !== "patient") {
    throw new AppError("Only patients can book walk-in center tests", 403);
  }

  const {
    patientName,
    patientAge,
    patientSex,
    patientMobile,
    patientEmail,
    patientAddress,
    branch,
    tests,
    walkinDate,
    timeSlot,
  } = req.body;

  if (
    !patientName ||
    !patientAge ||
    !patientSex ||
    !patientMobile ||
    !patientEmail ||
    !patientAddress ||
    !branch ||
    !walkinDate ||
    !timeSlot
  ) {
    throw new AppError("Missing required booking fields", 400);
  }

  const age = Number(patientAge);

  if (!Number.isInteger(age) || age < 1 || age > 120) {
    throw new AppError("Enter valid patient age", 400);
  }

  if (!["Male", "Female", "Other"].includes(patientSex)) {
    throw new AppError("Invalid patient gender", 400);
  }

  if (!isValidMobile(patientMobile)) {
    throw new AppError("Invalid mobile number", 400);
  }

  if (!isValidEmail(patientEmail)) {
    throw new AppError("Invalid email address", 400);
  }

  if (!Array.isArray(tests) || tests.length === 0) {
    throw new AppError("Please select at least one test", 400);
  }

  if (tests.length > 2) {
    throw new AppError("Maximum 2 tests allowed per booking", 400);
  }

  const requestedTestIds = tests.map((test) => test.id);

  const dbTests = await getActiveHomeServiceTestsByIds(requestedTestIds);

  if (dbTests.length !== requestedTestIds.length) {
    throw new AppError("One or more selected tests are invalid", 400);
  }

  const totalAmount = dbTests.reduce(
    (sum, test) => sum + Number(test.price || 0),
    0
  );

  const booking = await createWalkInCenterBooking({
    userId,
    patientName: patientName.trim(),
    patientAge: age,
    patientSex,
    patientMobile: patientMobile.trim(),
    patientEmail: patientEmail.trim().toLowerCase(),
    patientAddress: patientAddress.trim(),
    branch,
    tests: dbTests,
    walkinDate,
    timeSlot,
    totalAmount,
    status: "pending",
  });

  return successResponse({
    res,
    status: 201,
    message: "Walk-in center test booked successfully",
    data: booking,
  });
});

module.exports = {
  bookWalkInCenterController,
};

===============================
FILE: server\src\modules\walkInCenters\models\walkInCenters.model.js
===============================

const crypto = require("crypto");
const db = require("../../../config/db");

function generateReceiptId() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const random = crypto.randomBytes(3).toString("hex").toUpperCase();

  return `WC${year}${month}${day}${random}`;
}

const createWalkInCenterBooking = async (bookingData) => {
  const receiptId = generateReceiptId();

  const testsJson = Array.isArray(bookingData.tests)
    ? JSON.stringify(bookingData.tests)
    : JSON.stringify([]);

  const [result] = await db.execute(
    `
    INSERT INTO diagnostic_walkin_bookings (
      receipt_id,
      user_id,
      patient_name,
      patient_age,
      patient_sex,
      patient_mobile,
      patient_email,
      patient_address,
      branch,
      tests,
      walkin_date,
      time_slot,
      total_amount,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      receiptId,
      bookingData.userId,
      bookingData.patientName,
      bookingData.patientAge,
      bookingData.patientSex,
      bookingData.patientMobile,
      bookingData.patientEmail,
      bookingData.patientAddress,
      bookingData.branch,
      testsJson,
      bookingData.walkinDate,
      bookingData.timeSlot,
      bookingData.totalAmount,
      bookingData.status || "pending",
    ]
  );

  return {
    id: result.insertId,
    receiptId,
    ...bookingData,
  };
};

module.exports = {
  createWalkInCenterBooking,
};

===============================
FILE: server\src\modules\walkInCenters\routes\walkInCenters.routes.js
===============================

const express = require("express");

const {
  bookWalkInCenterController,
} = require("../controllers/walkInCenters.controller");

const { authenticate } = require("../../auth/middleware/auth.middleware");

const router = express.Router();

router.post("/book", authenticate, bookWalkInCenterController);

module.exports = router;

===============================
FILE: server\src\shared\middleware\error.middleware.js
===============================

const errorMiddleware = (err, req, res, next) => {

    console.error(err);

    return res.status(err.status || 500).json({
        success : false,
        message : err.message || "Internal server error"
    });
};

module.exports = errorMiddleware;


===============================
FILE: server\src\shared\utils\AppError.js
===============================

class AppError extends Error {
    constructor(message, status = 500) {
        super(message);

        this.status = status;
    }
}

module.exports = AppError;


===============================
FILE: server\src\shared\utils\asyncHandler.js
===============================

const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };
};

module.exports = asyncHandler;


===============================
FILE: server\src\shared\utils\response.js
===============================

const successResponse = ({
    res,
    status = 200,
    message,
    data = null
}) => {
    return res.status(status).json({
        success : true,
        message,
        data
    });
};

module.exports = {
    successResponse
};


===============================
FILE: server\src\server.js
===============================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const path = require("path");

const db = require("./config/db");

const authRoutes = require("./modules/auth/routes/auth.routes");
const profileRoutes = require("./modules/profile/routes/profile.routes");
const appointmentRoutes = require("./modules/appointment/routes/appointment.routes");
const homeServiceRoutes = require("./modules/homeService/routes/homeService.routes");
const pharmacyRoutes = require("./modules/pharmacy/routes/pharmacy.routes");
const consultancyHomeRoutes = require("./modules/consultancyHome/routes/consultancyHome.routes");
<<<<<<< Updated upstream
const walkInCentersRoutes = require("./modules/walkInCenters/routes/walkInCenters.routes");
const clinicRoutes = require("./modules/clinic/routes/clinic.routes");

=======
const teleConsultationRoutes =
require(
"./modules/teleConsultation/routes/teleConsultation.routes"
);
>>>>>>> Stashed changes
const errorMiddleware = require("./shared/middleware/error.middleware");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests",
  },
});

app.use("/auth", authLimiter);

app.get("/health", async (req, res) => {
  try {
    await db.query("SELECT 1");

    res.status(200).json({
      success: true,
      message: "CallMedex server is running",
      database: "connected",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "disconnected",
    });
  }
});

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/home-service", homeServiceRoutes);
app.use("/pharmacy", pharmacyRoutes);
app.use("/consultancy-home", consultancyHomeRoutes);
<<<<<<< Updated upstream
app.use("/walk-in-centers", walkInCentersRoutes);
app.use("/clinic", clinicRoutes);
=======
app.use(
  "/api/tele-consultation",
  teleConsultationRoutes
);
>>>>>>> Stashed changes

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
