const SessionServices = require("../services/SessionServices");
// const { format } = require('date-fns');

// // Function to format the date and time
// const formatDateTimeForMySQL = (date) => {
//   return format(date, 'yyyy-MM-dd HH:mm:ss');
// };

// // Example usage
// const now = new Date();
// const formattedDateTime = formatDateTimeForMySQL(now);
// console.log(formattedDateTime);

const createSession = async(req, res) => {
    try {
        const { UserId, Description, Title, Link, Img, Interests, SessionTime } =
        req.body;

        const result = await SessionServices.createSession(
            userId,
            description,
            title,
            link,
            sessionImg,
            interestId,
            0,
            sessionTime
        );
        if (result) {
            res.status(200).json({
                success: true,
                data: result,
                message: "Session created successfully",
            });
        } else {
            res.status(400).json({
                success: false,
                data: null,
                message: "Session creation failed",
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
                message: "List retrieval failed",
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

const updateSession = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await SessionServices.updateSession(id, req.body);

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
            message: error.message,
        });
    }
};

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