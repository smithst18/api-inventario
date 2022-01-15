'use strict'
var { Product_Type}  = require('../models/index');

module.exports = {

    add: async function (req,res){ //OK
        var params = req.body;
        var user = req.user;
        if(user){
            const [family, created] = await Product_Type.findOrCreate({
                where: { name: params.name },
                defaults: {
                  name:params.name,
                }
            }).catch(err =>{ return res.status(400).send({err:err})});
            if(created){
                return res.status(200).send({
                    message:"Tipo de producto agregado",
                    product_type:created,
                });
            }else if(!created && family){
                return res.status(400).send({message:"The product family already exist"});
            }else return res.status(500).send({message:"Server error"});
        }else return res.status(403).send({message:"you are not logged in"});
    },
    //return all categories and their producst
    getall:async function(req,res){
        var user = req.user;
        if(user){
            var product_types = await Product_Type.findAll({
                attributes: ['id','name'],
                /*include:{
                    as: 'products',
                    model: Product,
                    attributes:['id','name','price','product_code','product_quantity']
                }*/
                }).catch(err =>{
                    console.log(err);
                    return res.status(500).send({message:'server error',err:err});
                });
            if(product_types){
                return res.status(200).send({
                    message:'data found',
                    product_types:product_types,
                });
            }else return res.status(404).send({message:'any data found'});
        }else return res.status(403).send({message:'no access allowed',error:'error code 403 forbidden'});
    }
}
