const express = require("express");
const router = express.Router();
const verify = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/", userController.createUser);
router.get("/", verify.verifyToken, userController.getUser);
router.get("/:id", verify.verifyToken, userController.getUserById);
router.delete("/:id", verify.verifyToken, userController.deleteUser);
router.put("/:id", verify.verifyToken, userController.updateUser);

module.exports = router;
