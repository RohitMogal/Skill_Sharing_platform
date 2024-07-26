const FeedbackServices = require("../services/feedbackServices");

const creatFeedback = async (req, res) => {
  try {
    const { UserId, SessionId, FeedbackComment } = req.body;

    const result = await FeedbackServices.createFeedback(
      UserId,
      SessionId,
      FeedbackComment,
    );
    if (result) {
      res.status(200).json({
        success: true,
        data: result,
        message: "Feedback created successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        message: "Feedback creation failed",
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

const getFeedback = async (req, res) => {
  try {
    const result = await FeedbackServices.getFeedback();

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

const getFeedbackBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const result = await FeedbackServices.getFeedbackBySession(sessionId);

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

const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await FeedbackServices.updateFeedback(id, req.body);

    if (result) {
      res.status(200).json({
        success: true,
        data: result,
        message: "Feedback updated successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        message: "Feedback update failed",
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

const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SessionServices.deleteFeedback(id);

    if (result) {
      res.status(200).json({
        success: true,
        data: null,
        message: "Feedback deleted successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        message: "Feedback deletion failed",
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
  creatFeedback,
  getFeedback,
  getFeedbackBySession,
  updateFeedback,
  deleteFeedback,
};
