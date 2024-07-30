const requestServices = require("../services/requestServices");

const createRequest = async (req, res) => {
  try {
    console.log(req.body);
    const { UserId, Description, Interest } = req.body;

    const result = await requestServices.createRequest(
      UserId,
      Description,
      Interest,
    );

    if (result) {
      res.status(200).json({
        success: true,
        data: result,
        message: "Request created successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        message: "Request creation failed",
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

const getRequest = async (req, res) => {
  try {
    const result = await requestServices.getRequest(req.body.userInterest);

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
      message: "Internal Server Error!",
    });
  }
};

const getFilteredRequest = async (req, res) => {
  try {
    const result = await requestServices.getFilteredRequest(
      req.body.userInterest,
    );

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
      message: "Internal Server Error!",
    });
  }
};

const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await requestServices.getRequestById(id);

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
        message: "Request not found",
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

const updateRequest = async (req, res) => {
  try {
    const { UserId, Description, Interest } = req.body;

    const result = await requestServices.updateRequest(
      req.params.id,
      UserId,
      Description,
      Interest,
    );

    if (result) {
      res.status(200).json({
        success: true,
        data: result,
        message: "Request updated successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        message: "Request update failed",
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

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await requestServices.deleteRequest(id);

    if (result) {
      res.status(200).json({
        success: true,
        data: null,
        message: "Request deleted successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        message: "Request deletion failed",
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
  createRequest,
  getRequest,
  getRequestById,
  updateRequest,
  deleteRequest,
  getFilteredRequest,
};
