const express = require("express");
const router = express.Router();
const interestMasterController = require("../controllers/interestMasterController");

router.post("/", interestMasterController.createInterest);
router.get("/", interestMasterController.getInterest);
router.get("/:id", interestMasterController.getInterestById);
router.delete("/:id", interestMasterController.deleteInterest);
router.put("/:id", interestMasterController.updateInterest);

module.exports = router;
