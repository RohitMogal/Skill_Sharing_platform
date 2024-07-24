const executeQuery = require("../config/db_config");

const createSession = async(userId, description, title, link, sessionImg, interestId, sessionRating, sessionTime) => {
    try {
        const query = `
      INSERT INTO Session 
      (Id,UserId, Description, Title, Link, SessionImg, InterestId, SessionRating, SessionTime,CreatedAt, UpdatedAt) 
      VALUES 
      (UUID(),?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
    `;

        const result = await executeQuery(query, [
            userId,
            description,
            title,
            link,
            sessionImg,
            interestId,
            sessionRating,
            sessionTime
        ]);

        return result;
    } catch (err) {
        throw new Error("Error creating session: " + err.message);
    }
};




const getSession = async() => {
    try {
        const query = `SELECT * FROM session WHERE IsDeleted = false`;
        const result = await executeQuery(query, []);
        return result;
    } catch (err) {
        throw new Error("Error fetching sessions: " + err.message);
    }
};

const getSessionById = async(id) => {
    try {
        const query = `SELECT * FROM session WHERE SessionId = ? AND IsDeleted = false`;
        const result = await executeQuery(query, [id]);
        return result;
    } catch (err) {
        throw new Error("Error fetching session by ID: " + err.message);
    }
};

const updateSession = async(id, updates) => {
    try {
        let query = `UPDATE session SET `;
        const fields = [];
        const values = [];

        for (const [key, value] of Object.entries(updates)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }

        query += fields.join(", ") + " WHERE SessionId = ?";

        values.push(id);

        const result = await executeQuery(query, values);
        return result;
    } catch (err) {
        throw new Error("Error updating session: " + err.message);
    }
};

const deleteSession = async(id) => {
    try {
        const query = `UPDATE session SET IsDeleted = true WHERE SessionId = ? `;
        const result = await executeQuery(query, [id]);
        return result;
    } catch (err) {
        throw new Error("Error deleting session: " + err.message);
    }
};

module.exports = {
    createSession,
    getSession,
    getSessionById,
    updateSession,
    deleteSession,
};