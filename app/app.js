'use strict'
/*importar express*/
const express = require("express");
//express
const server = express();//crear instancia de express

const cors = require("cors");//importa cors

/*imports de las rutas para el servidor routes modules */
const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');
const productRoutes= require('./routes/productRoutes');
const qrRoutes = require('./routes/qrRoutes');
const productypeRoutes = require('./routes/productTypeRoutes');
const stockRoutes = require('./routes/stockRoutes')
const productNotiRoutes = require('./routes/productNotiRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
/*******middlewares modules******/
//request to json 
server.use(express.json());
server.use(express.urlencoded({extended:false}));
//cors configurations for allow http request 
server.use(cors());

/*use router's files through middlewares*/

server.use('/api',userRoutes);
server.use('/api',customerRoutes);
server.use('/api',productRoutes);
server.use('/api',qrRoutes);
server.use('/api',productypeRoutes);
server.use('/api',stockRoutes);
server.use('/api',productNotiRoutes);
server.use('/api',paymentRoutes);


//export 
module.exports = server;
