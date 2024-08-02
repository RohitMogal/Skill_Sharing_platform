const executeQuery = require("../config/db_config");

// Create UserInterest
const createUserInterest = async (userId, interests) => {
  try {
    const query = `INSERT INTO UserInterest (UserId, Interests) VALUES (?, ?);`;
    const result = await executeQuery(query, [userId, interests]);
    return result;
  } catch (err) {
    throw new Error("Error creating user interest: " + err.message);
  }
};

// Get all UserInterests
const getUserInterests = async () => {
  try {
    const query = `SELECT Id,UserId, Interests FROM UserInterest WHERE IsDeleted = ?`;
    const result = await executeQuery(query, [false]);
    return result;
  } catch (err) {
    throw new Error("Error fetching user interests: " + err.message);
  }
};

// Get UserInterest by ID
const getUserInterestById = async (id) => {
  try {
    const query = `SELECT Id ,UserId, Interests FROM UserInterest WHERE Id = ? AND IsDeleted = ?`;
    const result = await executeQuery(query, [id, false]);
    return result;
  } catch (err) {
    throw new Error("Error fetching user interest by ID: " + err.message);
  }
};

// Update UserInterest
const updateUserInterest = async (id, interests) => {
  try {
    let query = `UPDATE UserInterest SET interests=? `;
    console.log(query);
    // process.exit();
    const result = await executeQuery(query, [interests]);
    return result;
  } catch (err) {
    throw new Error("Error updating user interest: " + err.message);
  }
};

// Delete UserInterest
const deleteUserInterest = async (id) => {
  try {
    const query = `UPDATE UserInterest SET IsDeleted =?  WHERE Id = ?`;
    const result = await executeQuery(query, [true, id]);
    return result;
  } catch (err) {
    throw new Error("Error deleting user interest: " + err.message);
  }
};

module.exports = {
  createUserInterest,
  getUserInterests,
  getUserInterestById,
  updateUserInterest,
  deleteUserInterest,
};
