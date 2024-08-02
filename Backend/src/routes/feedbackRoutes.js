const express = require("express");
const router = express.Router();
const FeedbackController = require("../controllers/feedbackController");
const verify = require("../controllers/authController");

router.post("/", verify.verifyToken, FeedbackController.creatFeedback);
router.get("/", verify.verifyToken, FeedbackController.getFeedback);
router.get("/:id", verify.verifyToken, FeedbackController.getFeedbackBySession);
router.put("/:id", verify.verifyToken, FeedbackController.updateFeedback);
router.delete("/:id", verify.verifyToken, FeedbackController.deleteFeedback);

module.exports = router;
