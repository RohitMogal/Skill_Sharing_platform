const executeQuery = require("../config/db_config");

// Function to check if a rating exists for a specific user
const ifExist = async (UserId) => {
  try {
    const query = `SELECT id FROM Rating WHERE UserId =?`;
    const result = await executeQuery(query, [UserId]);
    return result;
  } catch (err) {
    throw new Error("Error checking if rating exists: " + err.message);
  }
};

// Function to create a new rating
const createRating = async (UserId, SessionId, Rating) => {
  try {
    const query = ` INSERT INTO Rating (UserId, SessionId, Rating, CreatedAt) VALUES (?, ?, ?, NOW());`;
    await executeQuery(query, [UserId, SessionId, Rating]);
    return true;
  } catch (err) {
    throw new Error("Error creating rating: " + err.message);
  }
};

// Function to retrieve all ratings
const getRating = async () => {
  try {
    const query = `SELECT * FROM Rating WHERE IsDeleted = false`;
    const result = await executeQuery(query, []);
    return result;
  } catch (err) {
    throw new Error("Error fetching ratings: " + err.message);
  }
};

// Function to retrieve a specific rating by its ID
const getRatingById = async (id) => {
  try {
    const query = `SELECT * FROM Rating WHERE Id = ? AND IsDeleted = false`;
    const result = await executeQuery(query, [id]);
    return result;
  } catch (err) {
    throw new Error("Error fetching rating by ID: " + err.message);
  }
};

// Function to update a rating for a specific user
const updateRating = async (UserId, Rating) => {
  try {
    const query = `UPDATE Rating SET Rating=? WHERE UserId=?`;
    await executeQuery(query, [Rating, UserId]);
    return true;
  } catch (err) {
    throw new Error("Error updating rating: " + err.message);
  }
};

// Function to delete (soft delete) a rating by its ID
const deleteRating = async (id) => {
  try {
    const query = `UPDATE Rating SET IsDeleted = true WHERE Id = ?`;
    const result = await executeQuery(query, [id]);
    return result;
  } catch (err) {
    throw new Error("Error deleting rating: " + err.message);
  }
};

// Function to calculate and update the average rating for a session
const sessionRatingAvg = async (sessionId) => {
  try {
    const getRatingQuery = `SELECT AVG(Rating) AS Rating, COUNT(UserId) AS NoOfRatings FROM Rating WHERE sessionid=? GROUP BY sessionid`;
    const getRatingResult = await executeQuery(getRatingQuery, [sessionId]);

    const updateSessionRatingQuery = `UPDATE Session SET Rating=?, NumberOfRating=? WHERE id=?`;
    await executeQuery(updateSessionRatingQuery, [
      getRatingResult[0].Rating,
      getRatingResult[0].NoOfRatings,
      sessionId,
    ]);

    return getRatingResult;
  } catch (err) {
    throw new Error("Error updating session rating average: " + err.message);
  }
};

module.exports = {
  createRating,
  getRating,
  getRatingById,
  updateRating,
  deleteRating,
  ifExist,
  sessionRatingAvg,
};
