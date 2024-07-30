const ratingServices = require("../services/ratingServices");

//Function to create new rating
const createRating = async(req, res) => {
    try {
        const { UserId, SessionId, Rating } = req.body;

        const result = await ratingServices.createRating(UserId, SessionId, Rating);

        if (result) {
            res.status(200).json({
                success: true,
                data: result,
                message: "Rating created successfully",
            });
        } else {
            res.status(400).json({
                success: false,
                data: null,
                message: "Rating creation failed",
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
// Function to fet all Ratings
const getRating = async(req, res) => {
    try {
        const result = await ratingServices.getRating();

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
                message: "List of Rating retrieval failed",
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

//Get specific rating rating by id 
const getRatingById = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await ratingServices.getRatingById(id);

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
                message: "Rating not found",
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

// Update specific rating by id
const updateRating = async(req, res) => {
    try {
        const { UserId, SessionId, Rating } = req.body;
        const result = await ratingServices.updateRating(req.params.id, UserId, SessionId, Rating);

        if (result) {
            res.status(200).json({
                success: true,
                data: result,
                message: "Rating updated successfully",
            });
        } else {
            res.status(400).json({
                success: false,
                data: null,
                message: "Rating update failed",
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

const deleteRating = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await ratingServices.deleteRating(id);

        if (result) {
            res.status(200).json({
                success: true,
                data: null,
                message: "Rating deleted successfully",
            });
        } else {
            res.status(400).json({
                success: false,
                data: null,
                message: "Rating deletion failed",
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

module.exports = { createRating, getRating, getRatingById, updateRating, deleteRating };