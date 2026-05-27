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
            role
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            userData.name,
            userData.phone,
            userData.email,
            userData.password_hash,
            userData.role
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