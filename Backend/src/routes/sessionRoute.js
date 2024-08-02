const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/Sessioncontroller");
const verify = require("../controllers/authController");

router.post("/", verify.verifyToken, sessionController.createsession);
router.get("/", verify.verifyToken, sessionController.getSession);
router.post(
  "/getfilterSession",
  verify.verifyToken,
  sessionController.getfilterSession,
);
router.get(
  "/getbyid/:id",
  verify.verifyToken,
  sessionController.getSessionById,
);
router.put("/:id", verify.verifyToken, sessionController.updateSession);
router.delete("/:id", verify.verifyToken, sessionController.deleteSession);
router.get("/myActivity", sessionController.myActivity);

module.exports = router;
