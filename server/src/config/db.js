const mysql = require("mysql2/promise");

const pool = mysql.createPool(process.env.MYSQL_PUBLIC_URL);

pool.getConnection()
  .then((connection) => {
    console.log("Database connected successfully");
    connection.release();
  })
  .catch((error) => {
    console.error("Database connection failed:");
    console.error(error);
  });

module.exports = pool;