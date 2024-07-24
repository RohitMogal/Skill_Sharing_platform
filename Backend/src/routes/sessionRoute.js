const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/Sessioncontroller");

router.post("/", sessionController.createsession);
router.get("/", sessionController.getSession);
router.get("/:id", sessionController.getSessionById);
router.put("/:id", sessionController.updateSession);
router.delete("/:id", sessionController.deleteSession);

module.exports = router;
