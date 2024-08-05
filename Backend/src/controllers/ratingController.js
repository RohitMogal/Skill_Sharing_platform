const ratingServices = require("../services/ratingServices");
//Rates a session and updates the rating if it already exists or creates a new rating if it doesn't.
const sessionRating = async (req, res) => {
  try {
    const UserId = req.headers.id;

    const ifRatingExist = await ratingServices.ifExist(UserId);

    let message = "";
    if (ifRatingExist.length > 0) {
      const { Rating } = req.body;
      await ratingServices.updateRating(UserId, Rating);
      message = "Rating updated successfully!";
    } else {
      const { SessionId, Rating } = req.body;
      await ratingServices.createRating(UserId, SessionId, Rating);
      message = "Rating added successfully!";
    }

    const result = await ratingServices.sessionRatingAvg(req.body.SessionId);

    res.status(200).json({
      success: true,
      data: result,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal Server Error!",
    });
  }
};
//get a list of all ratings.
const getRating = async (req, res) => {
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
//Get Rating by ID
const getRatingById = async (req, res) => {
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
      message: "Internal Server Error!",
    });
  }
};
//Deletes a rating by its ID.
const deleteRating = async (req, res) => {
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
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  getRating,
  getRatingById,
  deleteRating,
  sessionRating,
};
