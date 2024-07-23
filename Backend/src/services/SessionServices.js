const executeQuery = require("../config/db_config");

const createsession = async(UserId, Description, Title, Link, SessionImg, InterestId, SessionTime) => {
    try {
        console.log("Parameters received:", { UserId, Description, Title, Link, SessionImg, InterestId, SessionTime });

        const query = `
            INSERT INTO session
            (UserId, Description, Title, Link, SessionImg, InterestId, SessionTime, CreatedAt) 
            VALUES 
            (?, ?, ?, ?, ?, ?, ?, NOW());
        `;
        const result = await executeQuery(query, [UserId, Description, Title, Link, SessionImg, InterestId, SessionTime]);
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

module.exports = { createsession, getSession, getSessionById, updateSession, deleteSession };