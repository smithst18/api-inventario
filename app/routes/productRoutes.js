'use strict'
const express = require('express');

//import controlers
const productController = require('../controllers/productController');
//import middlewares
var jwt = require('../middlewares/jwtAuth');
//import routes express
const router = express.Router();

/*routes*/

router.post('/product/add',jwt.authentication,productController.add);
router.get('/product/all',jwt.authentication,productController.all);
router.get('/product/get-one/:id',jwt.authentication,productController.getOne);
router.get('/product/search/:search',jwt.authentication,productController.search);
//router.post('/product/update',jwt.authentication,productController.update);
//router.post('/product/delete',jwt.authentication,productController.delete);

module.exports = router;