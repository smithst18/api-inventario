'use strict';
var { Product } = require('../models/index');

exports.validStock = async function(products){
  var enoughtStock = false;

  for await (let product of products){
    //si hay algun error se coloca en el array
    let stock = await Product.findByPk(product.id).catch( err => { 
      return res.status(403).send({err:err});
    });

    if(stock.product_quantity >= product.product_quantity){
      enoughtStock = true;
    }else{
      enoughtStock = false;
      return enoughtStock;
    }
    //si no hay errores y el valor del stock es igual o mayor al que se va a retirar todo ok
  }
  //si hay errores  entonces falso
  //if(errors.length > 0) enoughtStock = false;
  return enoughtStock;
};