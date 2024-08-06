const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
//Executes a MySQL query using a connection pool.
const executeQuery = async (query, params) => {
  let connection;
  try {
    connection = await pool.getConnection();
    // process.exit();
    const [results] = await connection.execute(query, params);
    return results;
  } catch (err) {
    console.error("Database query error:", err.message);
    throw new Error("Database query error: " + err.message);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = executeQuery;
