const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController'); // Ensure the correct path to your sessionController.js

router.post('/', ratingController.createRating);
router.get('/', ratingController.getRating);
router.get('/:id', ratingController.getRatingById);
router.put('/:id', ratingController.updateRating);
router.delete('/:id', ratingController.deleteRating);

module.exports = router;