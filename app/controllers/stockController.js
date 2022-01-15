'use strict'
var { StockMove, Product,User } = require('../models/index');
var validator = require('validator');

module.exports = {
  //se guarda el movimiento realizado al producto espesifico
  saveStockMove: async function(req,res){
    var params = req.body;
    var user = req.user;
    //validations for params
    try{
      var operationValid = !validator.isEmpty(params.operation);
      var move_quantityValid = !validator.isEmpty(params.move_quantity.toString());
      var user_idValid = !validator.isEmpty(params.user_id.toString());
      var product_idValid = !validator.isEmpty(params.product_id.toString());
      var descriptionValid = !validator.isEmpty(params.description);
    }catch(err){
      return res.status(400).send({
        message:"invalid data",
        err: err
      });
    }
    //if user log save movestock
    if(user && user != null){
      //save move
      var stockMove = await StockMove.create({
        operation: params.operation,
        move_quantity: params.move_quantity,
        description: params.description,
        user_id: params.user_id,
        product_id: params.product_id,
      }).catch(err =>{
        return res.status(400).send({err:err});
      });
      //if stock_move true 
      if(stockMove){
        res.status(200).send({message:"stock move saved"});
      }else return res.status(500).send({message:"error saving"});
    }else return res.status(403).send({message:"Not access allow"});

  },

  //se realiza una de las 3 operaciones pertinentes en el stock del producto 
  operation: async function(req,res){
    var params = req.body;
    var user = req.user;
    
    if(user && user != null){//user loged
      const product = await Product.findByPk(params.product_id)
        .catch( err =>{ console.error('error',err) });
      //product exist 
      if(product){
        //increment
        if(params.operation == "increment"){
          if(params.move_quantity > 0){

            const stockIncrement = await Product.increment({
              product_quantity: params.move_quantity,
            },{
              where: { id: params.product_id } 
            }).catch(err =>{ return res.status(403).send({err:err}) });

            if(stockIncrement) res.status(200).send({message:"Increment done "});
            else res.status(500).send({message:"server error "});

          }else return res.status(403).send({message:"quantity increment must be 1 or higher"});
        }
        //Decrement
        else if(params.operation == "decrement"){
          if(product.product_quantity >= params.move_quantity && params.move_quantity > 0){

            const stockDecrement = await Product.decrement({
              product_quantity: params.move_quantity,
            },{
              where: { id: params.product_id } 
            }).catch(err =>{ return res.status(403).send({err:err}) });

            if(stockDecrement) res.status(200).send({message:"Decrement done "});
            else res.status(500).send({message:"server error "});

          }else return res.status(403).send({
            message:"the final stock must be 0 or higher and the quantity decrement must be 1 or higher"
          });
        }
        //Substitution
        else if(params.operation == "substitution"){

          const Substitution = await Product.update({ product_quantity: params.move_quantity },
            {
              where: { id:params.product_id }
            }
          ).catch(err =>{ return res.status(403).send({err:err}) });

          if(Substitution) return res.status(200).send({
            message:"substitution succes",
            NewStock:params.move_quantity,
          });
          else res.status(500).send({message:"server error "});

        }else return res.status(403).send({message:"invalid operation"});
      }
    }else return res.status(403).send({message:"Not access allow"});
  },

  getAllById: async function(req,res){
    var params = req.params;
    var user = req.user;
    if(user && user != null){

      const stockMoves = await StockMove.findAll({
        where:{
          product_id:params.id,
        },
        include:[{
          as: 'user',
          model: User,
          attributes:['name']
        },{
          as: 'product',
          model: Product,
          attributes:['name']
        }],
      }).catch(err =>{ return res.status(403).send({err}) });;
      if(stockMoves) return res.status(200).send({message:"succes",stockMoves:stockMoves,product_id:params.product_id,});
      else res.status(500).send({message:"server error "});
      
    }else return res.status(403).send({message:"Not access allow"});
  },

//end of controller 
};
