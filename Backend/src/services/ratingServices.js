const executeQuery = require("../config/db_config");

// Function to create a new Rating
const createRating = async(UserId, SessionId, Rating) => {
    try {
        const query = `
            INSERT INTO rating
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

// Function to get all Rating
const getRating = async() => {
    try {
        const query = `SELECT UserId, SessionId, Rating FROM rating WHERE IsDeleted = ?`;
        const result = await executeQuery(query, [false]);
        return result;
    } catch (err) {
        throw new Error("Error fetching ratings: " + err.message);
    }
};

// Function to retrieve a specific rating by its ID
const getRatingById = async(id) => {
    try {
        const query = `SELECT UserId, SessionId, Rating FROM rating WHERE Id = ? AND IsDeleted = ?`;
        const result = await executeQuery(query, [false]);
        return result;
    } catch (err) {
        throw new Error("Error fetching rating by ID: " + err.message);
    }
};

// Function to update a specific Rating
const updateRating = async(UserId, SessionId, Rating) => {
    try {
        let query = `UPDATE rating SET UserId, SessionId, Rating WHERE id=?`;

        const result = await executeQuery(query, [
            UserId,
            SessionId,
            Rating
        ]);
        return result;
    } catch (err) {
        throw new Error("Error updating Rating: " + err.message);
    }
};

const deleteRating = async(id) => {
    try {
        const query = `UPDATE rating DELETE IsDeleted = true WHERE Id = ? `;
        const result = await executeQuery(query, [true, id]);
        return result;
    } catch (err) {
        throw new Error("Error deleting rating: " + err.message);
    }
};

module.exports = { createRating, getRating, getRatingById, updateRating, deleteRating };