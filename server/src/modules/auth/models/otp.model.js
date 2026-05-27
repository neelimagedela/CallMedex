const db = require("../../../config/db");

const createOtp = async (data) => {
  const expiresAt = new Date(
    Date.now() + Number(process.env.OTP_EXPIRES_MINUTES || 5) * 60 * 1000
  );

  await db.execute(
    `
    INSERT INTO verification_otps
    (
      user_id,
      otp_hash,
      type,
      expires_at
    )
    VALUES (?, ?, ?, ?)
    `,
    [data.userId, data.otpHash, data.type, expiresAt]
  );
};

const findLatestOtp = async(data) => {

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
        [
            data.userId,
            data.type
        ]
    );

    return rows[0];
};

const deleteOtp = async(otpId) => {

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
    deleteOtp,
    markOtpUsed
};