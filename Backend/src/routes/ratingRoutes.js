const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController"); // Ensure the correct path to your sessionController.js
const verify = require("../controllers/authController");

// router.post('/', ratingController.createRating);
router.post("/", verify.verifyToken, ratingController.sessionRating);
router.get("/", verify.verifyToken, ratingController.getRating);
router.get("/:id", verify.verifyToken, ratingController.getRatingById);
// router.put('/:id', ratingController.updateRating);
router.delete("/:id", verify.verifyToken, ratingController.deleteRating);

module.exports = router;