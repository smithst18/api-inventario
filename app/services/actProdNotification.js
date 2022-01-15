'use strict';
var { Product,Product_Notification } = require('../models/index');

exports.actProdNotification = async function(products){
//if the stock of the products its <= than the value to report, then the notification whould be showed
  for await (let product of products){
    //get the product
    const stock = await Product.findByPk(product.id)
      .catch(err=> { return res.status(400).send({err:err})});
    if(stock && stock.active_notification == true){
      //get the notification of that product
      const notification = await Product_Notification.findOne({where: { product_id: product.id }})
        .catch(err=> { return res.status(400).send({err:err})});
      if(notification){
        //if notification exist then set on status value to true if the stock is low or equal than the value to report
        if(stock.product_quantity <= notification.value_to_report){
          await Product_Notification.update(
            { status:true },{
            where:{
              product_id: stock.id,
            }
          });
        }else if(stock.product_quantity >= notification.value_to_report){
          await Product_Notification.update(
            { status: false },{
            where:{
              product_id: stock.id,
            }
          });
        }
      }return console.log("notification not found");
    }return console.log("product not found  or the notification is not active");
  }
  return console.log("ok");
};