const express = require('express');
const router = express.Router();
const { createSession, updateSession, deleteSession, getSessionById } = require('../controllers/sessionController'); // Ensure the correct path to your sessionController.js


router.post('/session/insert', createSession);
router.put('/session/update', updateSession);
router.delete('/session/delete', deleteSession);
router.get('/session/:guid', getSessionById);

module.exports = router;