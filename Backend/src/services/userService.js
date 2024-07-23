const executeQuery = require("../config/db_config");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const createUser = async (fullName, email, password, profilePic, about) => {
  try {
    const query = `INSERT INTO User (UserId, FullName, email, password,profilePic) VALUES (UUID(), ?, ?, ?,?);`;
    const result = await executeQuery(query, [
      fullName,
      email,
      password,
      profilePic,
      about,
    ]);
    return result;
  } catch (err) {
    throw new Error("Error creating user: " + err.message);
  }
};

const getUser = async () => {
  try {
    const query = `SELECT * FROM User WHERE IsDeleted = false`;
    const result = await executeQuery(query, []);
    return result;
  } catch (err) {
    throw new Error("Error fetching users: " + err.message);
  }
};

const getUserById = async (id) => {
  try {
    const query = `SELECT * FROM User WHERE UserId = ? AND IsDeleted = false`;
    const result = await executeQuery(query, [id]);
    return result;
  } catch (err) {
    throw new Error("Error fetching user by ID: " + err.message);
  }
};

const updateUser = async (id, updates) => {
  try {
    let query = `UPDATE User SET `;
    const fields = [];
    const values = [];
    let hashPassword;

    for (const [key, value] of Object.entries(updates)) {
      fields.push(`${key} = ?`);
      if (key == "password") {
        hashPassword = await bcrypt.hash(value, saltRounds);
        values.push(hashPassword);
      } else {
        values.push(value);
      }
    }

    query += fields.join(", ") + " WHERE UserId = ?";

    values.push(id);

    const result = await executeQuery(query, values);
    return result;
  } catch (err) {
    throw new Error("Error updating user: " + err.message);
  }
};

const deleteUser = async (id) => {
  try {
    const query = `UPDATE User SET IsDeleted = true WHERE UserId = ? `;
    const result = await executeQuery(query, [id]);
    return result;
  } catch (err) {
    throw new Error("Error deleting user: " + err.message);
  }
};

module.exports = { createUser, getUser, getUserById, updateUser, deleteUser };
