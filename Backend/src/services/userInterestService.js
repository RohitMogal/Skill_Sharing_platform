const executeQuery = require("../config/db_config");

// Create a new UserInterest
const createUserInterest = async (userId, interests) => {
  try {
    const query = `INSERT INTO UserInterest (UserId, Interests) VALUES (?, ?);`;
    const result = await executeQuery(query, [userId, interests]);
    return result;
  } catch (err) {
    throw new Error("Error creating user interest: " + err.message);
  }
};

// Get all UserInterests that are not deleted
const getUserInterests = async () => {
  try {
    const query = `SELECT Id, UserId, Interests FROM UserInterest WHERE IsDeleted = ?`;
    const result = await executeQuery(query, [false]);
    return result;
  } catch (err) {
    throw new Error("Error fetching user interests: " + err.message);
  }
};

// Get a specific UserInterest by its ID
const getUserInterestById = async (id) => {
  try {
    const query = `SELECT Id, UserId, Interests FROM UserInterest WHERE Id = ? AND IsDeleted = ?`;
    const result = await executeQuery(query, [id, false]);
    return result;
  } catch (err) {
    throw new Error("Error fetching user interest by ID: " + err.message);
  }
};

// Update an existing UserInterest by its ID
const updateUserInterest = async (id, interests) => {
  try {
    const query = `UPDATE UserInterest SET Interests = ? WHERE Id = ?`;

    const result = await executeQuery(query, [interests, id]);
    return result;
  } catch (err) {
    throw new Error("Error updating user interest: " + err.message);
  }
};

// Soft delete a UserInterest by its ID
const deleteUserInterest = async (id) => {
  try {
    const query = `UPDATE UserInterest SET IsDeleted = ? WHERE Id = ?`;
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
