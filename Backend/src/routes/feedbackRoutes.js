const express = require('express');
const router = express.Router();
const FeedbackController = require('../controllers/feedbackController');

router.post('/', FeedbackController.createFeedback);
router.get('/', FeedbackController.getFeedback);
router.get('/:session_feedbackId', FeedbackController.getFeedbackBySession);
router.put('/:id', FeedbackController.updateFeedback);
router.delete('/:id', FeedbackController.deleteFeedback);


module.exports = router;