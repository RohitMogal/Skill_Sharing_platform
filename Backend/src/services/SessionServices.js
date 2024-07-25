const executeQuery = require("../config/db_config");

// Function to create a new session 
const createSession = async(UserId, Description, Title, Link, Img, Interests, SessionTime) => {
    try {
        // SQL query to insert a new session record into the 'session' table
        const query = `
            INSERT INTO session
            (UserId, Description, Title, Link, Img, Interests, SessionTime, CreatedAt) 
            VALUES 
            (?, ?, ?, ?, ?, ?, ?, NOW());
        `;

        const result = await executeQuery(query, [
            UserId,
            Description,
            Title,
            Link,
            Img,
            Interests,
            SessionTime
        ]);

        return result;
    } catch (err) {
        throw new Error("Error creating session: " + err.message);
    }
};


// Function to retrieve all non-deleted sessions 
const getSession = async() => {
    try {
        const query = `SELECT Description, Title, Link, Img, Interests, SessionTime FROM session WHERE IsDeleted = ?`;
        const result = await executeQuery(query, [false]);
        return result;
    } catch (err) {
        throw new Error("Error fetching sessions: " + err.message);
    }
};

// Function to retrieve a specific session by its ID 
const getSessionById = async(id) => {
    try {
        const query = `SELECT Description, Title, Link, Img, Interests,  SessionTime FROM session WHERE  IsDeleted = ?`;
        const result = await executeQuery(query, [id, false]);
        return result;
    } catch (err) {
        throw new Error("Error fetching session by ID: " + err.message);
    }
};

// Function to update a specific session 
const updateSession = async(Description, Title, Link, Img, Interests, SessionTime) => {
    try {
        let query = `UPDATE session SET Description=?, Title=?, Link=?, Img=?, Interests=?, SessionRating=?, SessionTime=? WHERE id=?`;

        const result = await executeQuery(query, [
            Description,
            Title,
            Link,
            Img,
            Interests,
            SessionTime,
        ]);
        return result;
    } catch (err) {
        throw new Error("Error updating session: " + err.message);
    }
};

// Function to delete (soft delete) a specific session 
const deleteSession = async(id) => {
    try {
        const query = `UPDATE session DELETE IsDeleted = true WHERE SessionId = ?`;
        const result = await executeQuery(query, [true, id]);
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