const executeQuery = require("../config/db_config");

const userExist = async (email) => {
  try {
    const query = `SELECT id,password FROM user WHERE email = ?`;
    const result = await executeQuery(query, [email]);
    return result;
  } catch (error) {
    console.error("Error executing query:", error.message);
    throw new Error("Database query failed");
  }
};

module.exports = { userExist };
