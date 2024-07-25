const SessionServices = require("../services/SessionServices");

// Function to create a new session
const createSession = async(req, res) => {
    try {
        // Extract necessary fields from the request body
        const { UserId, Description, Title, Link, Img, Interests, SessionTime } = req.body;

        // Call the service to create a new session with the extracted data
        const result = await SessionServices.createSession(
            UserId,
            Description,
            Title,
            Link,
            Img,
            Interests,
            SessionTime
        );
        // If the session creation is successful, return a success response
        if (result) {
            res.status(200).json({
                success: true,
                data: result,
                message: "Session created successfully",
            });
        } else {
            // If the session creation fails, return a failure response
            res.status(400).json({
                success: false,
                data: null,
                message: "Session creation failed",
            });
        }
    } catch (error) {
        // If an error occurs, return an error response
        res.status(500).json({
            success: false,
            data: null,
            message: error.message,
        });
    }
};

// Function to retrieve all sessions
const getSession = async(req, res) => {
    try {
        const result = await SessionServices.getSession();
        if (result.length > 0) {
            res.status(200).json({
                success: true,
                data: result,
                message: "Success",
            });
        } else {
            res.status(400).json({
                success: false,
                data: null,
                message: "List of Session retrieval failed",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: error.message,
        });
    }
};

// Function to retrieve a specific session by its ID
const getSessionById = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await SessionServices.getSessionById(id);
        if (result.length > 0) {
            res.status(200).json({
                success: true,
                data: result,
                message: "Success",
            });
        } else {
            res.status(400).json({
                success: false,
                data: null,
                message: "Session not found",
            });
        }
    } catch (error) {

        res.status(500).json({
            success: false,
            data: null,
            message: error.message,
        });
    }
};

// Function to update an existing session
const updateSession = async(req, res) => {
    try {
        const { UserId, Description, Title, Link, Img, InterestId } = req.body;

        const result = await SessionServices.updateSession(
            req.params.id,
            UserId,
            Description,
            Title,
            Link,
            Img,
            InterestId
        );

        if (result) {
            res.status(200).json({
                success: true,
                data: result,
                message: "Session updated successfully",
            });
        } else {

            res.status(400).json({
                success: false,
                data: null,
                message: "Session update failed",
            });
        }
    } catch (error) {

        res.status(500).json({
            success: false,
            data: null,
            message: "Internal Server Error!",
        });
    }
};

// Function to delete an existing session
const deleteSession = async(req, res) => {
    try {
        const { id } = req.params;

        const result = await SessionServices.deleteSession(id);

        if (result) {
            res.status(200).json({
                success: true,
                data: null,
                message: "Session deleted successfully",
            });
        } else {
            res.status(400).json({
                success: false,
                data: null,
                message: "Session deletion failed",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: error.message,
        });
    }
};

module.exports = {
    createSession,
    getSession,
    getSessionById,
    updateSession,
    deleteSession,
};


// const { format } = require('date-fns');

// // Function to format the date and time
// const formatDateTimeForMySQL = (date) => {
//   return format(date, 'yyyy-MM-dd HH:mm:ss');
// };

// // Example usage
// const now = new Date();
// const formattedDateTime = formatDateTimeForMySQL(now);
// console.log(formattedDateTime);