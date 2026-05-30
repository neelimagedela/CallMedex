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