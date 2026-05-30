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