const executeQuery = require("../config/db_config");

const createRating = async(UserId, SessionId, Rating, CreatedAt, IsDeleted) => {
    try {
        console.log("Parameters received:", { UserId, SessionId, Rating, CreatedAt, IsDeleted });

        const query = `
            INSERT INTO session
            (UserId, SessionId, Rating, CreatedAt, IsDeleted) 
            VALUES 
            (?, ?, ?, NOW(),?);
        `;
        const result = await executeQuery(query, [UserId, SessionId, Rating, CreatedAt, IsDeleted]);
        return result;
    } catch (err) {
        throw new Error("Error Rating session: " + err.message);
    }
};


const getRating = async() => {
    try {
        const query = `SELECT * FROM Rating WHERE IsDeleted = false`;
        const result = await executeQuery(query, []);
        return result;
    } catch (err) {
        throw new Error("Error fetching rating: " + err.message);
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

        query += fields.join(", ") + " WHERE ID = ?";

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
        throw new Error("Error deleting Rating: " + err.message);
    }
};

module.exports = { createRating, getRating, getRatingById, updateRating, deleteRating };