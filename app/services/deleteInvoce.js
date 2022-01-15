'use strict';
var { Payment, Product_Payment, Product } = require('../models/index');
//function  delete the wrong rows create before
exports.DeleteInvoice = async function(payment,promesErrors){
  
  for await(let errorId of promesErrors){
    var deletedProductPayment = await Product_Payment.destroy({
        where: {
          id: errorId.id
        }
    });
    //increment stock
    if(deletedProductPayment){
      await Product.increment(
        { product_quantity: errorId.product_qty }, 
        { where: { id: errorId.product_id } }
      );
    }
  }
  await Payment.destroy({
    where: {
        id: payment.id
    }
  });
};
