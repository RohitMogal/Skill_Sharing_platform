const interestMasterService = require("../services/interestMasterService");
//Creates a new interest.
const createInterest = async (req, res) => {
  try {
    const { interest } = req.body;
    const result = await interestMasterService.createInterest(interest);

    res.status(200).json({
      success: true,
      message: "Interest created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal Server Error!",
    });
  }
};
//Retrieves all interests.
const getInterest = async (req, res) => {
  try {
    const result = await interestMasterService.getInterest();

    if (result.length > 0) {
      res.status(200).json({
        success: true,
        data: result,
        message: "Interest retrieved successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        data: null,
        message: "Interest not found",
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
//Retrieves an interest by ID.
const getInterestById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await interestMasterService.getInterestById(id);

    if (result.length > 0) {
      res.status(200).json({
        success: true,
        data: result,
        message: "Interest retrieved successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        data: null,
        message: "Interest not found",
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
//Updates an interest.
const updateInterest = async (req, res) => {
  try {
    const result = await interestMasterService.updateInterest(
      req.params.id,
      req.body.interest,
    );

    if (result) {
      res.status(200).json({
        success: true,
        data: result,
        message: "Interest updated successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        data: null,
        message: "Interest not found or no changes made",
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
// Function to handle the deletion of an interest
const deleteInterest = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await interestMasterService.deleteInterest(id);

    if (result) {
      res.status(200).json({
        success: true,
        data: result,
        message: "Interest deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        data: null,
        message: "Interest not found",
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
  createInterest,
  getInterestById,
  updateInterest,
  deleteInterest,
  getInterest,
};
