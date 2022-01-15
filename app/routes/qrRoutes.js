'use strict'
const express = require('express');

//import controlers
const qrController = require('../controllers/qrController');

//import routes express
const router = express.Router();
//middlewares
var jwt = require('../middlewares/jwtAuth');
/*routes*/

router.post('/qr/makeQR',jwt.authentication,qrController.makeQR);
router.get('/qr/QRstatus/:id',jwt.authentication,qrController.statusQR);

module.exports = router;