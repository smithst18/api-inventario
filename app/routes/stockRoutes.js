'use strict'
const express = require('express');

//import controlers
const StockController = require('../controllers/stockController');
//import middlewares
var jwt = require('../middlewares/jwtAuth');
//import routes express
const router = express.Router();

/*routes*/
router.post('/stock/save-move-stock',jwt.authentication,StockController.saveStockMove);
router.post('/stock/operation',jwt.authentication,StockController.operation);
router.get('/stock/get-all-by-product/:id',jwt.authentication,StockController.getAllById);

module.exports = router;