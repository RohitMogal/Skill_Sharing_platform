const executeQuery = require("../config/db_config");

const createFeedback = async (UserId, SessionId, FeedbackComment) => {
  try {
    const query =
      "INSERT INTO Feedback (UserId, SessionId, FeedbackComment, CreatedAt) VALUES (?, ?, ?, NOW())";

    const result = await executeQuery(query, [
      UserId,
      SessionId,
      FeedbackComment,
    ]);
    return result;
  } catch (err) {
    throw new Error("Error creating Feedback: " + err.message);
  }
};

const getFeedback = async () => {
  try {
    const query = `SELECT * FROM Feedback WHERE IsDeleted = false`;
    const result = await executeQuery(query, []);
    return result;
  } catch (err) {
    throw new Error("Error fetching sessions: " + err.message);
  }
};

const getFeedbackBySession = async (SessionId) => {
  try {
    const query =
      "SELECT * FROM Feedback WHERE SessionId = ? AND IsDeleted = 0";
    const result = await executeQuery(query, [SessionId]);
    return result;
  } catch (err) {
    throw new Error("Error fetching Feedback by ID: " + err.message);
  }
};

const updateFeedback = async (id, updates) => {
  try {
    let query = `UPDATE Feedback SET `;
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(updates)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }

    query += fields.join(", ") + " WHERE WHERE id = ?";

    values.push(id);

    const [result] = await db.execute(query, values);
    return result.affectedRows;
  } catch (err) {
    throw new Error("Error updating feedback: " + err.message);
  }
};

const deleteFeedback = async (id) => {
  try {
    const query = "UPDATE Feedback SET IsDeleted = 1 WHERE id = ?";
    const result = await executeQuery(query, [id]);
    return result;
  } catch (err) {
    throw new Error("Error deleting Feedback: " + err.message);
  }
};

module.exports = {
  createFeedback,
  getFeedback,
  getFeedbackBySession,
  updateFeedback,
  deleteFeedback,
};
