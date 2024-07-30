const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/', paymentController.createPayment);
router.get('/', paymentController.getPayment);
router.get('/:id', paymentController.getPaymentById);


module.exports = router;