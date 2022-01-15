'use strict'
var { Product, Payment, Product_Payment, Customer } = require('../models/index');
var moment = require('moment');
moment.locale('es');
var deleteService = require('../services/deleteInvoce');
var stockService = require('../services/validStock');
var notificationService = require('../services/actProdNotification');
module.exports = {

    createPayment: async function (req,res){//OK
        var params = req.body;
        var user = req.user;
        var promesErrors = [];
        var sub_total = 0;
        var total = 0;
        var deleteAll = false;
        //this var is false is the user pay with credit 
        var paymentStatus = true
        if(user){
            const customer = await Customer.findByPk(params.payment.customer_id)
            .catch(err =>{ return res.status(403).send({err:err})});
            if(customer){
                if(customer.active == true){
                //create payment 
                    if(params.payment && params.products){
                        let validStock = await stockService.validStock(params.products);
                        if(validStock == true){
                        //generate total sub total etc
                            params.products.forEach( product => {
                                sub_total = sub_total  + (product.product_quantity * product.price);
                            });
                            //total
                            total = (sub_total * params.payment.iva/100) + sub_total;
                            //if payment type is  credit set status to false 
                            if(params.payment.payment_type == 'credito') paymentStatus = false;
                            //create payment
                            var payment = await Payment.create({
                                payment_type: params.payment.payment_type,
                                iva: params.payment.iva,
                                sub_total: sub_total,
                                total: total,
                                status: paymentStatus,
                                customer_id: params.payment.customer_id,
                            }).catch(err => {return res.status(403).send({err:err})});

                            if(payment && payment != null && payment != undefined){
                                for await(let product of params.products){
                                    //if any price < 0
                                    if(product.price > 1 ){
                                        var productpayment = await Product_Payment.create(
                                            { 
                                                product_name: product.name,
                                                product_qty: product.product_quantity,
                                                product_id: product.id,
                                                product_price:product.price
                                            }
                                        ).catch(err => { deleteAll = true, console.log(err) });
                                            
                                        if(productpayment && productpayment != null && productpayment != undefined){
                                            //save de created element in case of error
                                            promesErrors.push(productpayment.dataValues);
                                            //decrement stock
                                            await Product.decrement(
                                                {product_quantity: productpayment.product_qty}, 
                                                { where: { id: productpayment.product_id } }
                                            ).catch(err => { deleteAll = true, console.log(err) });//<=============
                                        
                                            //create association in the invoice table
                                            await payment.addProduct_Payment(productpayment)
                                            .catch(err => { deleteAll = true, console.log(err)});
                                        }
                                    }else deleteAll = true;
                                }
                                //if any error found delete the rows created 
                                if( deleteAll == true){

                                    await deleteService.DeleteInvoice(payment,promesErrors); 
                                    return res.status(400).send({ message:'Datos erroneos' });

                                }else if(deleteAll == false) {
                                    //if the payment is created and all was ok then check the notifications  and return the message
                                    await notificationService.actProdNotification(params.products);
                                    return res.status(200).send({mesage:"Invoice created"});
                                }

                            }else res.status(500).send({message:'server error'});

                        }else res.status(403).send({message:'Stoack insuficiente'});

                    }else return res.status(400).send({message:'Datos faltantes'});

                }else return res.status(403).send({message:"El cliente no esta activo"});
            }else return res.status(404).send({message:"El cliente ha Facturar no existe"});
        }else return res.status(403).send({message:'No te encuentras logeado'}); 
    },
    allById: async function (req,res){//OK
        var id = req.params.id;
        var user = req.user;
        if(user){
            if(id !=null || id != undefined){
                var payments = await Payment.findAll({
                    where:{ customer_id : id},
                    attributes: { exclude: ['customer_id'] },
                    include:[
                        //product_payment
                        {
                            model: Product_Payment,
                            attributes:['id','product_qty','createdAt','updatedAt'],
                            include:[
                                {   
                                    as:'paidProduct',
                                    model:Product,
                                    attributes: { exclude: ['product_quantity'] },
                                }
                            ],
                        }
                    ],
                }).catch(err =>{ res.status(400).send({err:err}) });
                if(payments && payments.length > 0) res.status(200).send({payments:payments});
                else res.status(404).send({message:"any invoice found"});
            }else return res.status(400).send({message:'Invalid Id'}); 
        }else return res.status(403).send({message:'you are not logged in'}); 
    },
    allInvoices: async function (req,res){
        var user = req.user;
        if(user){
            var payments = await Payment.findAll({
                attributes: { exclude: ['customer_id'] },
                include:[
                    //customer /client
                    { 
                        association:'client',
                        attributes:['id','name','ci','active'],
                     },
                    //product_payment
                    {
                        model: Product_Payment,
                        attributes:['id','product_qty','createdAt','updatedAt'],
                        include:[
                            {   
                                as:'paidProduct',
                                model:Product,
                                attributes: { exclude: ['product_quantity'] },
                            }
                        ],
                    }
                ],
            }).catch(err =>{ res.status(400).send({err:err}) });
            if(payments && payments.length > 0) res.status(200).send({payments:payments});
            else res.status(404).send({message:"any invoice found"});
        }else return res.status(403).send({message:'you are not logged in'}); 
    },
    payConfirmation:async function(req,res){
        var id = req.params.id;
        var user = req.user;
        if(user){
            if(id){
                const payment = await Payment.findByPk(id)
                .catch(err => {return res.status(400).send({err:err}) }); 
                if(payment){

                    const payed = await Payment.update({ status:true },{
                        where:{ id: payment.id }
                    }).catch( err=>{ return res.status(400).send({err:err})});

                    if(payed) return res.status(200).send({message:"Payment status changed"});
                    else return res.status(500).send({message:"server error"});

                }else return res.status(404).send({message:"payment not found "});
            }else return res.status(403).send({message:"id is required "});
        }else return res.status(403).send({message:"you are not logged in "});
    },

    earnings:async function(req,res){
        var totalday = 0;
        var totalmonth = 0;
       var user = req.user;
        if(user){
            const payments = await Payment.findAll({
                where:{ 
                    status:true,
                }
            }).catch( err =>{ return res.status(500).send({err:err}) })
            if(payments && payments.length > 0){
                let now = moment().format('DD MM YYYY');
                let month = moment().format('MM');
                payments.forEach( pay => {
                    //earns  x day
                    let date = moment(new Date(pay.createdAt)).format('DD MM YYYY');
                    if(moment(date).isSame(now)){
                        totalday = totalday + pay.total;
                    }
                    //earns  x month
                    let date2 = moment(new Date(pay.createdAt)).format('MM');
                    if(moment(date2).isSame(month)){
                        totalmonth = totalmonth + pay.total;
                    }
                }); 
                var earnings = {
                    daysGain: totalday, //earns  x day
                    monthGain: totalmonth, //earns  x month
                }
                return res.status(200).send({earnings:earnings})
            }else return res.status(404).send({message:"any payment found"});
        }else return res.status(403).send({message:"you are not logged in "});
    },
    oneById:async function (req,res){
        var id = req.params.id;
        var user = req.user
        if(user){
            var payment = await Payment.findByPk(id,{
                attributes: { exclude: ['customer_id'] },
                include:[
                    //customer /client
                    { 
                        association:'client',
                        attributes: {exclude:['email','updatedAt']},
                     },
                    //product_payment
                    {
                        model: Product_Payment,
                        attributes:['id','product_qty','product_price','createdAt','updatedAt'],
                        include:[
                            {   
                                as:'paidProduct',
                                model:Product,
                                attributes: { exclude: ['product_quantity'] },
                            }
                        ],
                    }
                ],
            }).catch(err =>{ res.status(400).send({err:err}) });
            if(payment) res.status(200).send({payment:payment});
            else res.status(404).send({message:"invoice not found"});
        }else return res.status(403).send({message:'you are not logged in'}); 
    }
}

