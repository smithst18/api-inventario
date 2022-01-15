'use strict'
const express = require('express');

//import controlers
const productNotiController = require('../controllers/productNotiController');
//import middlewares
var jwt = require('../middlewares/jwtAuth');
//import routes express
const router = express.Router();

/*routes*/

router.post('/notification/set-status',jwt.authentication,productNotiController.setStatus);

module.exports = router;