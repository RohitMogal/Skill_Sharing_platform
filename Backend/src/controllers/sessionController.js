const SessionServices = require("../services/SessionServices");
//Creates a new session.
const createsession = async (req, res) => {
  try {
    const UserId = req.headers.id;
    const { Description, Title, Link, Img, Interests, SessionTime, Amount } =
      req.body;

    const result = await SessionServices.createsession(
      UserId,
      Description,
      Title,
      Link,
      Img,
      Interests,
      SessionTime,
      Amount,
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
      message: "Internal Server Error!",
    });
  }
};
//Retrieves sessions based on user interests.
const getSession = async (req, res) => {
  try {
    const result = await SessionServices.getSession(req.body.userInterest);

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
//Retrieves filtered sessions based on user interests.
const getfilterSession = async (req, res) => {
  try {
    const result = await SessionServices.getfilterSession(
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
//Retrieves a specific session by its ID.
const getSessionById = async (req, res) => {
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
      message: "Internal Server Error!",
    });
  }
};
//Updates an existing session.
const updateSession = async (req, res) => {
  try {
    const { UserId, Description, Title, Link, Img, Interests, SessionTime } =
      req.body;

    const result = await SessionServices.updateSession(
      req.params.id,
      UserId,
      Description,
      Title,
      Link,
      Img,
      Interests,
      SessionTime,
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
// Deletes a session by its ID.
const deleteSession = async (req, res) => {
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
      message: "Internal Server Error!",
    });
  }
};
//Retrieves sessions related to the logged-in user's activity.
const myActivity = async (req, res) => {
  try {
    const { id } = req.headers;
    const result = await SessionServices.myActivity(id);

    if (result) {
      res.status(200).json({
        success: true,
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        message: "Retrival failed",
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
  createsession,
  getSession,
  getSessionById,
  updateSession,
  deleteSession,
  getfilterSession,
  myActivity,
};
