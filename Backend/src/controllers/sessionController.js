const db = require('../db/connection');

// Function to handle session creation
const createSession = async(req, res) => {
    console.log("Req", req.body);
    try {
        const { Description, title, link, tags, Time } = req.body;

        // Check for missing fields
        if (!Description || !title || !link) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields: Description, title, link"
            });
        }

        // Insert Sessions into the database
        const [result] = await db.query('INSERT INTO Sessions (guid, Description, title, link, tags, Time, created_at) VALUES (UUID(), ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)', [Description, title, link, tags, Time]);

        // Check if insertion was successful
        if (!result.affectedRows) {
            return res.status(500).json({
                success: false,
                message: "Error inserting session"
            });
        }

        res.status(200).json({
            success: true,
            message: "Session created successfully",
            session: {
                guid: result.insertId,
                Description,
                title,
                link,
                tags,
                Time,
                created_at: new Date()
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in create session",
            error: error.message
        });
    }
};

const updateSession = async(req, res) => {
    console.log("Req", req.body);
    try {
        const { guid, Description, title, link, tags, Time } = req.body;

        // Check for missing fields
        if (!guid || !Description || !title || !link || !Time) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields: guid, Description, title, link, Time"
            });
        }

        // Update the session in the database
        const [result] = await db.query(
            'UPDATE Sessions SET Description = ?, title = ?, link = ?, tags = ?, Time = ? WHERE guid = ?', [Description, title, link, tags, Time, guid]
        );

        // Check if the update was successful
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Session updated successfully",
            session: {
                guid,
                Description,
                title,
                link,
                tags,
                Time,
                updated_at: new Date()
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error updating session",
            error: error.message
        });
    }
};

const deleteSession = async(req, res) => {
    console.log("Req", req.body);
    try {
        const { guid } = req.body;

        // Check for missing fields
        if (!guid) {
            return res.status(400).json({
                success: false,
                message: "Please provide the guid of the session to delete"
            });
        }

        // Delete the session from the database
        const [result] = await db.query('DELETE FROM Sessions WHERE guid = ?', [guid]);

        // Check if the deletion was successful
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Session deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error deleting session",
            error: error.message
        });
    }
};


const getSessionById = async(req, res) => {
    console.log("Req", req.params);
    try {
        const { guid } = req.params;

        // Check for missing fields
        if (!guid) {
            return res.status(400).json({
                success: false,
                message: "Please provide the guid of the session to fetch"
            });
        }

        // Fetch the session from the database
        const [rows] = await db.query('SELECT * FROM Sessions WHERE guid = ?', [guid]);

        // Check if the session exists
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            });
        }

        res.status(200).json({
            success: true,
            session: rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching session",
            error: error.message
        });
    }
};

module.exports = {
    createSession,
    updateSession,
    deleteSession,
    getSessionById
};