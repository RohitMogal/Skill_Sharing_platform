const executeQuery = require("../config/db_config");

const createRating = async(UserId, SessionId, Rating) => {
    try {
        const query = `
            INSERT INTO Rating
            (UserId, SessionId, Rating, CreatedAt, IsDeleted) 
            VALUES 
            (?, ?, ?, NOW(), 0);
        `;
        const result = await executeQuery(query, [UserId, SessionId, Rating]);
        return result;
    } catch (err) {
        throw new Error("Error creating rating: " + err.message);
    }
};

const getRating = async() => {
    try {
        const query = `SELECT * FROM Rating WHERE IsDeleted = false`;
        const result = await executeQuery(query, []);
        return result;
    } catch (err) {
        throw new Error("Error fetching ratings: " + err.message);
    }
};

const getRatingById = async(id) => {
    try {
        const query = `SELECT * FROM Rating WHERE Id = ? AND IsDeleted = false`;
        const result = await executeQuery(query, [id]);
        return result;
    } catch (err) {
        throw new Error("Error fetching rating by ID: " + err.message);
    }
};

const updateRating = async(id, updates) => {
    try {
        let query = `UPDATE Rating SET `;
        const fields = [];
        const values = [];

        for (const [key, value] of Object.entries(updates)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }

        query += fields.join(", ") + " WHERE Id = ?";

        values.push(id);

        const result = await executeQuery(query, values);
        return result;
    } catch (err) {
        throw new Error("Error updating rating: " + err.message);
    }
};

const deleteRating = async(id) => {
    try {
        const query = `UPDATE Rating SET IsDeleted = true WHERE Id = ? `;
        const result = await executeQuery(query, [id]);
        return result;
    } catch (err) {
        throw new Error("Error deleting rating: " + err.message);
    }
};

module.exports = { createRating, getRating, getRatingById, updateRating, deleteRating };