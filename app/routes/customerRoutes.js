'use strict'
const express = require('express');

//import controlers
const customerController = require('../controllers/customerController');
var jwt = require('../middlewares/jwtAuth');
//import routes express
const router = express.Router();

/*routes*/
router.post('/customer/register',jwt.authentication,customerController.save);
router.get('/customer/get-customers',jwt.authentication,customerController.getCustomers);
router.get('/customer/get-actives',jwt.authentication,customerController.getActives);
router.get('/customer/activate-one/:id',jwt.authentication,customerController.activateOne);
router.get('/customer/desactivate-one/:id',jwt.authentication,customerController.desactivateOne);
router.get('/customer/get-one/:id',jwt.authentication,customerController.getOne);
router.get('/customer/search-customer/:search',jwt.authentication,customerController.search);


module.exports = router;