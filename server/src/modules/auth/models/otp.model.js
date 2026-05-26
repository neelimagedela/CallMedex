const db = require("../../../config/db");

const createOtp = async(data) => {

    await db.execute(
        `
        INSERT INTO verification_otps
        (
            user_id,
            otp_hash,
            type,
            expires_at
        )
        VALUES
        (
            ?, ?, ?,
            DATE_ADD(
                NOW(),
                INTERVAL ? MINUTE
            )
        )
        `,
        [
            data.userId,
            data.otpHash,
            data.type,
            process.env.OTP_EXPIRES_MINUTES
        ]
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

module.exports = {
    createOtp,
    findLatestOtp,
    deleteOtp
};