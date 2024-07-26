const executeQuery = require("../config/db_config");

const ifExist = async (UserId) => {
  try {
    const query = `SELECT id FROM Rating WHERE UserId =?`;
    const result = await executeQuery(query, [UserId]);
    return result;
  } catch (err) {
    throw new Error("Error Rating session: " + err.message);
  }
};
const createRating = async (UserId, SessionId, Rating) => {
  try {
    const query = ` INSERT INTO Rating (UserId, SessionId, Rating, CreatedAt)  VALUES  (?, ?, ?, NOW());`;
    await executeQuery(query, [UserId, SessionId, Rating]);
    return true;
  } catch (err) {
    throw new Error("Error Rating session: " + err.message);
  }
};

const getRating = async () => {
  try {
    const query = `SELECT * FROM Rating WHERE IsDeleted = false`;
    const result = await executeQuery(query, []);
    return result;
  } catch (err) {
    throw new Error("Error fetching rating: " + err.message);
  }
};

const getRatingById = async (id) => {
  try {
    const query = `SELECT * FROM Rating WHERE Id = ? AND IsDeleted = false`;
    const result = await executeQuery(query, [id]);
    return result;
  } catch (err) {
    throw new Error("Error fetching rating by ID: " + err.message);
  }
};

const updateRating = async (UserId, Rating) => {
  try {
    let query = `UPDATE Rating SET Rating=? WHERE UserId=?`;

    await executeQuery(query, [Rating, UserId]);
    return true;
  } catch (err) {
    throw new Error("Error updating rating: " + err.message);
  }
};

const deleteRating = async (id) => {
  try {
    const query = `UPDATE Rating SET IsDeleted = true WHERE Id = ? `;
    const result = await executeQuery(query, [id]);
    return result;
  } catch (err) {
    throw new Error("Error deleting Rating: " + err.message);
  }
};

const sessionRatingAvg = async (sessionId) => {
  try {
    const getRatingQuery = `SELECT AVG(Rating) AS Rating,COUNT(UserId) AS NoOfRatings from Rating WHERE sessionid=? Group By sessionid`;
    const getRatingResult = await executeQuery(getRatingQuery, [sessionId]);

    const updateSessionRatingQuery = `UPDATE Session SET Rating=? ,NumberOfRating=? WHERE id=? `;
    await executeQuery(updateSessionRatingQuery, [
      getRatingResult[0].Rating,
      getRatingResult[0].NoOfRatings,
      sessionId,
    ]);

    return getRatingResult;
  } catch (err) {
    throw new Error("Error deleting session: " + err.message);
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
