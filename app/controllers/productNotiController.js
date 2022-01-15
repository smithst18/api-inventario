'use strict'
var { Product_Notification,Product } = require('../models/index');
module.exports = {
  setStatus: async function (req,res){
    var params = req.body;
    var user = req.user;
    if(user){
      //find the product
      const product = await Product.findByPk(params.product_id).catch(err =>{ return res.status(400).send({err:err})});
      //if the product exist and the id  == id of params then 
      if(product){
        //find or create the notification 
        const [notification, created] = await Product_Notification.findOrCreate({
          where: { product_id: params.product_id },
          defaults: {
            value_to_report: params.value_to_report,
            status: false,
            product_id: params.product_id,
          }
        }).catch(err =>{ return res.status(400).send({err:err})});
        //if created 
        if(created){
          const active = await Product.update({ active_notification: true }, {
            where: {
              id: params.product_id,
            }
          }).catch(err =>{ return res.status(400).send({err:err})});

          if(active) return res.status(200).send({message:"Notification created and activated"});
          else return res.status(500).send({message:"server error"});
        }
        //if found notification 
        if(notification && params.desactive == false){
          //set notification to true
          const active = await Product.update({ active_notification: true }, {
            where: {
              id: params.product_id,
            }
          }).catch(err =>{ return res.status(400).send({err:err})});
          //update the value of notification
          await Product_Notification.update({ value_to_report: params.value_to_report }, {
            where: {
              product_id: params.product_id,
            }
          }).catch(err =>{ return res.status(400).send({err:err})});
          if(active){

            return res.status(200).send({message:"Notification activated"});
          }else return res.status(500).send({message:"server error"});

        }else if(notification && params.desactive == true){
          //set notification to false
          const desactive = await Product.update({ active_notification: false }, {
            where: {
              id: params.product_id,
            }
          }).catch(err =>{ return res.status(400).send({err:err})});
          //update the status of the notification
          await Product_Notification.update({ status: false }, {
            where: {
              product_id: params.product_id,
            }
          }).catch(err =>{ return res.status(400).send({err:err})});
          if(desactive){
            return res.status(200).send({message:"Notification desactivated"});

          }else return res.status(500).send({message:"server error"});

        }else return res.status(404).send({message:"error setting the notification status"});

      }else return res.status(404).send({message:"Product not found"});

    }else return res.status(403).send({message:"you are not logged in"});
  },
}