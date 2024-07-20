require("dotenv").config();
const mysql = require("mysql2/promise");

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to execute a query with parameters
const executeQuery = async (query, params) => {
  let connection;
  try {
    connection = await pool.getConnection(); // Get a connection from the pool
    const [results] = await connection.execute(query, params); // Execute the query with parameters
    return results; // Return the result
  } catch (err) {
    throw new Error("Database query error: " + err.message);
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
};

module.exports = { executeQuery };
