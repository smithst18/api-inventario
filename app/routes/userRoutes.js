'use strict'
const express = require('express');

//import controlers
const userController = require('../controllers/userController');
var auth = require('../middlewares/jwtAuth');
//import routes express
const router = express.Router();

/*routes*/

router.post('/user/login',userController.login);


module.exports = router;