'use strict'
const express = require('express');

//import controlers
const paymentController = require('../controllers/paymentController');
//import middlewares
var jwt = require('../middlewares/jwtAuth');
//import routes express
const router = express.Router();

/*routes*/
router.post('/payment/add',jwt.authentication,paymentController.createPayment);
router.get('/payment/all-by-id/:id',jwt.authentication,paymentController.allById);
router.get('/payment/all-payments',jwt.authentication,paymentController.allInvoices);
router.get('/payment/payment-confirmation/:id',jwt.authentication,paymentController.payConfirmation);
router.get('/payment/payment-earns',jwt.authentication,paymentController.earnings);
router.get('/payment/one-by-id/:id',jwt.authentication,paymentController.oneById);

module.exports = router;