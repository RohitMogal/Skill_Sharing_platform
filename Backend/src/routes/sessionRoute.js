const express = require('express');
const router = express.Router();
const Session2controller = require('../controllers/Session2controller'); // Ensure the correct path to your sessionController.js

router.post('/', Session2controller.createsession);
router.get('/', Session2controller.getSession);
router.get('/:id', Session2controller.getSessionById);
router.put('/:id', Session2controller.updateSession);
router.delete('/:id', Session2controller.deleteSession);

module.exports = router;