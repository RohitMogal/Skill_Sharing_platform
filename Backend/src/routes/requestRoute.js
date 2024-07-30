const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController"); // Ensure the correct path to your requestController.js
const verify = require("../controllers/authController");

// Define routes for request operations
router.post("/", verify.verifyToken, requestController.createRequest);
router.get("/", verify.verifyToken, requestController.getRequest);
router.get("/:id", verify.verifyToken, requestController.getRequestById);
router.put("/:id", verify.verifyToken, requestController.updateRequest);
router.delete("/:id", verify.verifyToken, requestController.deleteRequest);

module.exports = router;
