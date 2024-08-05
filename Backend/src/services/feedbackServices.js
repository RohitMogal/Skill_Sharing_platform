const executeQuery = require("../config/db_config");

// Function to create feedback for a session
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

// Function to get all feedback that is not deleted
const getFeedback = async () => {
  try {
    const query = `SELECT UserId, SessionId, FeedbackComment FROM Feedback WHERE IsDeleted = ?`;
    const result = await executeQuery(query, [false]);
    return result;
  } catch (err) {
    throw new Error("Error fetching sessions: " + err.message);
  }
};

// Function to get feedback for a specific session
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

// Function to update feedback details
const updateFeedback = async (id, UserId, SessionId, FeedbackComment) => {
  try {
    const query = `UPDATE Feedback SET UserId = ?, SessionId = ?, FeedbackComment = ? WHERE id = ?`;
    const values = [UserId, SessionId, FeedbackComment, id];

    const result = await executeQuery(query, values);
    return result;
  } catch (err) {
    throw new Error("Error updating feedback: " + err.message);
  }
};

// Function to soft delete feedback by setting IsDeleted to true
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
