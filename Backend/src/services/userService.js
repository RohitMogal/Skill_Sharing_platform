const query1 = require("../config/db_config");

const createUser = async (fullName, email, password) => {
  try {
    const query = `INSERT INTO Users (guid, FullName, email, password) VALUES (UUID(), ?, ?, ?);`;
    const result = await query1.executeQuery(query, [
      fullName,
      email,
      password,
    ]);
    return result;
  } catch (err) {
    throw new Error("Error creating user: " + err.message);
  }
};

module.exports = { createUser };
