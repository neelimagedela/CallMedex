const pool = require("../../../config/db");

const createUser = async (userData) => {
  const {
    name,
    phone,
    email,
    role,
  } = userData;

  const query = `
    INSERT INTO users (
      name,
      phone,
      email,
      role
    )
    VALUES (?, ?, ?, ?)
  `;

  const values = [
    name,
    phone,
    email,
    role,
  ];

  const [result] = await pool.query(query, values);

  return result;
};

const findUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users
    WHERE email = ?
  `;

  const [rows] = await pool.query(query, [email]);

  return rows[0];
};

const findUserByPhone = async (phone) => {
  const query = `
    SELECT * FROM users
    WHERE phone = ?
  `;

  const [rows] = await pool.query(query, [phone]);

  return rows[0];
};

const findUserById = async (id) => {
  const query = `
    SELECT * FROM users
    WHERE id = ?
  `;

  const [rows] = await pool.query(query, [id]);

  return rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByPhone,
  findUserById,
};
