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