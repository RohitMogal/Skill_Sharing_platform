const userInterestServices = require("../services/userInterestService");
const Joi = require("joi");

const userInterestValidation = Joi.object({
  userId: Joi.string(),
  interests: Joi.string().required(),
});

//Create UserInterest
const createUserInterest = async (req, res) => {
  try {
    const { error } = userInterestValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        data: null,
        message: error.details[0].message,
      });
    }

    const { userId, interests } = req.body;

    const result = await userInterestServices.createUserInterest(
      userId,
      interests,
    );

    if (result) {
      res.status(200).json({
        success: true,
        data: result,
        message: "User interest created successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        message: "User interest creation failed",
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

//Get all UserInterests
const getUserInterests = async (req, res) => {
  try {
    const result = await userInterestServices.getUserInterests();

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
        message: "No user interests found",
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

//Get UserInterest by ID
const getUserInterestById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userInterestServices.getUserInterestById(id);

    if (result) {
      res.status(200).json({
        success: true,
        data: result,
        message: "Success",
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        message: "User interest not found",
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

//Update UserInterest
const updateUserInterest = async (req, res) => {
  try {
    const { error } = userInterestValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        data: null,
        message: error.details[0].message,
      });
    }

    const { id } = req.params;
    const { interests } = req.body;

    const result = await userInterestServices.updateUserInterest(id, interests);

    if (result) {
      res.status(200).json({
        success: true,
        data: result,
        message: "User interest updated successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        message: "User interest update failed",
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

//Delete UserInterest
const deleteUserInterest = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userInterestServices.deleteUserInterest(id);

    if (result) {
      res.status(200).json({
        success: true,
        data: null,
        message: "User interest deleted successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        message: "User interest deletion failed",
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

module.exports = {
  createUserInterest,
  getUserInterests,
  getUserInterestById,
  updateUserInterest,
  deleteUserInterest,
};
