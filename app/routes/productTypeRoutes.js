'use strict'
const express = require('express');

//import controlers
const productTypeController = require('../controllers/productTypeController');
//import middlewares
var jwt = require('../middlewares/jwtAuth');
//import routes express
const router = express.Router();

/*routes*/
router.post('/productType/add',jwt.authentication,productTypeController.add);
router.get('/productType/getall',jwt.authentication,productTypeController.getall);

module.exports = router;