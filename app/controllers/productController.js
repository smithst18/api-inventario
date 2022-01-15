'use strict'
var { Product } = require('../models/index');
const { Op } = require("sequelize");
module.exports = {

    add: async function (req,res){//OK
        var params = req.body;
        var user = req.user;
        console.log(user);
        console.log(params);
        if (user){
            //find or created de product 
            console.log(params);
            const [product,created] = await Product.findOrCreate({
                where: { 
                    [Op.or]: [
                        {name: params.name},
                        {product_code: params.product_code},
                    ],
                },
                defaults: {
                    name: params.name.toLowerCase(),
                    price: params.price,
                    product_code: params.product_code.toUpperCase(),
                    product_quantity: params.product_quantity,
                    product_family: params.product_family,
                    active_notification:false,
                },
            }).catch(err =>{return res.status(403).send({message:"bad data",err:err})});
            //if the product was succesfully created we return 200
            if(created){
                return res.status(200).send({
                    message:"Product was created successfully",
                    product:product
                });
                //if the product already exist  we return 403
            }else if (!created){
                return res.status(403).send({message:"The Product is already registered"});
            }else return res.status(500).send({message:"Server error"});
        }else return res.status(403).send({message:"you are not logged in"});
    },
    //all products and their product type
    all: async function (req,res){//OK
        var user = req.user;
        if(user){
            var products = await Product.findAll({
                attributes:['id','name','price','product_code','product_quantity','createdAt'],
                include:{
                    association: "family",
                    attributes:["name"],
                }
            })
                .catch(err =>{
                    return res.status(500).send({message:`server error: ${err}`});
                });
            if(products.length > 0){
                return res.status(200).send({
                    message:"products founds",
                    products:products, 
                });
            }else return res.status(404).send({message:'any product found'});
        }else return res.status(403).send({message:'forbiden'});
    },
    //get one product
    getOne:async function (req,res){
        var user = req.user;
        var id = req.params.id
        if(user){
            var product = await Product.findByPk(id,{
                attributes:{
                    exclude:["product_family"]
                },
                include:{
                    association: "family",
                    attributes:["name"],
                }
            }).catch(err =>{
                return res.status(500).send({message:`server error: ${err}`});
            });
            if(product === null){
                return res.status(404).send({message:"not found"});
            }else{
                return res.status(200).send({product:product});
            }
        }else return res.status(403).send({message:'forbiden'});
    },

    //search for  some characters
    search:async function (req,res){//OK
        var search = req.params.search;
        var user = req.user;
        if(user){
            var products = await Product.findAll({
                where:{
                    [Op.or]: [
                        { name: { [Op.like]: search.toLowerCase() }},
                        { name: { [Op.startsWith]: search.toLowerCase() }},
                        { name: { [Op.endsWith]: search.toLowerCase() }},
                        { product_code: { [Op.like]: search.toUpperCase() }},
                    ]
                },
                attributes:['id','name','price','product_code','product_quantity'],
                include:{
                    association: "family",
                    attributes:["name"],
                }
            }).catch(err =>{
                return res.status(500).send({message:'response request error ',err:err});
            });
            if(products.length > 0){
                return res.status(200).send({
                    message:"matches:",
                    products:products,
                });
            }else return res.status(404).send({message:'results not found'});
        }else return res.status(403).send({message:'you are not logged in'});
    },
}
