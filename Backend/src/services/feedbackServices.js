const executeQuery = require("../config/db_config");

// Function to create a new feedback
const createFeedback = async(UserId, SessionId, FeedbackComment) => {
    try {
        const query = `
            INSERT INTO feedback (UserId, SessionId, FeedbackComment, CreatedAt) 
            VALUES (?, ?, ?, NOW())
        `;
        const result = await executeQuery(query, [UserId, SessionId, FeedbackComment]);
        return result;
    } catch (err) {
        throw new Error("Error creating Feedback: " + err.message);
    }
};

// Function to retrieve all non-deleted feedback 
const getFeedback = async() => {
    try {
        const query = `SELECT UserId, SessionId, FeedbackComment FROM feedback WHERE IsDeleted = ?`;
        const result = await executeQuery(query, [false]);
        return result;
    } catch (err) {
        throw new Error("Error fetching feedback: " + err.message);
    }
};

// Function to retrieve a specific feedback by its ID
const getFeedbackBySession = async(Id) => {
    try {
        const query = 'SELECT UserId, SessionId, FeedbackComment FROM feedback WHERE SessionId = ? AND IsDeleted = ?';
        const result = await executeQuery(query, [Id, false]); // Correctly binding the SessionId and IsDeleted values
        return result;
    } catch (err) {
        throw new Error("Error fetching Feedback by session ID: " + err.message);
    }
};


// Function to update a specific feedback 
const updateFeedback = async(UserId, SessionId, FeedbackComment) => {
    try {
        let query = `UPDATE feedback SET UserId, SessionId, FeedbackComment WHERE id=?`;

        const result = await executeQuery(query, [
            UserId,
            SessionId,
            FeedbackComment
        ]);
        return result;
    } catch (err) {
        throw new Error("Error updating Feedback: " + err.message);
    }
};

// Function to delete (soft delete) a specific feedback
const deleteFeedback = async(id) => {
    try {
        const query = 'UPDATE feedback DELETE IsDeleted = true WHERE id = ?';
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