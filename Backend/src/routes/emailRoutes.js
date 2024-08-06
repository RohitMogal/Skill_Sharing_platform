const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");
const verify = require("../controllers/authController");
router.post("/", verify.verifyToken, emailController.interestedEmail);

module.exports = router;
