const express = require("express");
const router = express.Router();
const verify = require("../controllers/authController");
const userInterestController = require("../controllers/userIntrestController");

router.post("/", userInterestController.createUserInterest);
router.get("/", userInterestController.getUserInterests);
router.get("/:id", userInterestController.getUserInterestById);
router.put("/:id", userInterestController.updateUserInterest);
router.delete("/:id", userInterestController.deleteUserInterest);
// router.post("/", verify.verifyToken, userInterestController.createUserInterest);
// router.get("/", verify.verifyToken, userInterestController.getUserInterests);
// router.get("/:id", verify.verifyToken, userInterestController.getUserInterestById);
// router.put("/:id", verify.verifyToken, userInterestController.updateUserInterest);
// router.delete("/:id", verify.verifyToken, userInterestController.deleteUserInterest);

module.exports = router;
