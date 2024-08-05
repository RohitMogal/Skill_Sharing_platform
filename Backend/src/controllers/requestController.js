const requestServices = require("../services/requestServices");
//Creates a new request.
const createRequest = async (req, res) => {
  try {
    console.log(req.body);
    const { Description, Title } = req.body;
    console.log(req.headers.id);
    const result = await requestServices.createRequest(
      req.headers.id,
      Description,
      Title,
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
//Get a list of requests based on user interest.
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
//Get a request by ID.
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
//Updates a request.
const updateRequest = async (req, res) => {
  try {
    const { UserId, Description, Title } = req.body;

    const result = await requestServices.updateRequest(
      req.params.id,
      UserId,
      Description,
      Title,
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
//Delete Request
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
};
