const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const db = require("../../../config/db");
const { sendPasswordResetOtp } = require("../services/email.service");
function generateOtp() {
  return crypto.randomInt(100000, 999999).toString();
}

function addMinutes(minutes) {
  return new Date(Date.now() + minutes * 60 * 1000);
}

exports.requestPasswordResetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [users] = await db.execute(
      `
      SELECT id, name, email
      FROM users
      WHERE LOWER(email) = ?
      LIMIT 1
      `,
      [normalizedEmail]
    );

    if (users.length === 0) {
      return res.json({
        success: true,
        message: "If this email exists, an OTP has been sent.",
      });
    }

    const user = users[0];
    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = addMinutes(10);

    await db.execute(
      `
      UPDATE password_reset_otps
      SET used_at = NOW()
      WHERE email = ? AND used_at IS NULL
      `,
      [normalizedEmail]
    );

    await db.execute(
      `
      INSERT INTO password_reset_otps
        (email, otp_hash, expires_at)
      VALUES (?, ?, ?)
      `,
      [normalizedEmail, otpHash, expiresAt]
    );

    await sendPasswordResetOtp({
      to: user.email,
      name: user.name,
      otp,
    });

    return res.json({
      success: true,
      message: "OTP sent to your email.",
    });
  } catch (error) {
    console.error("Forgot password OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

exports.resetPasswordWithOtp = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and new password are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [users] = await db.execute(
      `
      SELECT id, email
      FROM users
      WHERE LOWER(email) = ?
      LIMIT 1
      `,
      [normalizedEmail]
    );

    if (users.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    const [otpRows] = await db.execute(
      `
      SELECT id, otp_hash, expires_at, used_at
      FROM password_reset_otps
      WHERE email = ?
        AND used_at IS NULL
        AND expires_at > NOW()
      ORDER BY id DESC
      LIMIT 1
      `,
      [normalizedEmail]
    );

    if (otpRows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or invalid",
      });
    }

    const resetOtp = otpRows[0];
    const isOtpValid = await bcrypt.compare(otp.trim(), resetOtp.otp_hash);

    if (!isOtpValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await db.execute(
      `
      UPDATE users
      SET password_hash = ?
      WHERE id = ?
      `,
      [passwordHash, users[0].id]
    );

    await db.execute(
      `
      UPDATE password_reset_otps
      SET used_at = NOW()
      WHERE id = ?
      `,
      [resetOtp.id]
    );

    await db.execute(
      `
      DELETE FROM sessions
      WHERE user_id = ?
      `,
      [users[0].id]
    ).catch(() => {});

    return res.json({
      success: true,
      message: "Password changed successfully. Please login again.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};