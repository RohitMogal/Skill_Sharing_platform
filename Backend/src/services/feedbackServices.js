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
    const query = `SELECT UserId, SessionId, FeedbackComment FROM Feedback WHERE IsDeleted = ?`;
    const result = await executeQuery(query, [false]);
    return result;
  } catch (err) {
    throw new Error("Error fetching sessions: " + err.message);
  }
};

const getFeedbackBySession = async (SessionId) => {
  try {
    const query =
      "SELECT UserId, SessionId, FeedbackComment FROM Feedback WHERE SessionId = ? AND IsDeleted = ?";
    const result = await executeQuery(query, [SessionId, false]);
    return result;
  } catch (err) {
    throw new Error("Error fetching Feedback by ID: " + err.message);
  }
};

const updateFeedback = async (id, UserId, SessionId, FeedbackComment) => {
  try {
    const query = `UPDATE Feedback SET UserId = ?, SessionId = ?, FeedbackComment = ?  WHERE id = ?`;
    const values = [UserId, SessionId, FeedbackComment, id];

    const result = await executeQuery(query, values);
    return result;
  } catch (err) {
    throw new Error("Error updating feedback: " + err.message);
  }
};

const deleteFeedback = async (id) => {
  try {
    const query = "UPDATE Feedback SET IsDeleted = ? WHERE id = ?";
    const result = await executeQuery(query, [true, id]);
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
