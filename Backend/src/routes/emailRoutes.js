const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");
const verify = require("../controllers/authController");
router.post("/", verify.verifyToken, emailController.interestedEmail);
// router.get("/google", emailController.googleAuth);
// router.get("/google/redirect", emailController.googleRedirect);
// router.post("/createEvent", emailController.createEvent);
// router.post("/verifyToken", emailController.verifyToken);

module.exports = router;
