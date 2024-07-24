const express = require("express");
const router = express.Router();
const verify = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/", userController.createUser);
router.get("/", userController.getUser);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);

module.exports = router;