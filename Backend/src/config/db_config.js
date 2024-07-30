const mysql = require("mysql2/promise");
require("dotenv").config();
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Aishwarya$1997",
    database: "Skill_Scheduling",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const executeQuery = async(query, params) => {
    let connection;
    try {
        connection = await pool.getConnection();
        console.log(query);
        console.log(params);
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