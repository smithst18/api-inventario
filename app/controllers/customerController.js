'use strict'
var { Customer } = require('../models/index');
const { Op } = require("sequelize");
module.exports = {
    //save customers
    save:async function (req,res){
        var params = req.body;
        var user = req.user;

        if(user){
            const [customer,created] =  await Customer.findOrCreate({
                where: { ci: params.ci },
                defaults:{
                    name:params.name.toLowerCase(),
                    ci:params.ci,
                    email:params.email,
                    phone_number:params.phone_number,
                    address:params.address,
                    qrcode:null,
                    active:true,
                },
            }).catch(err =>{ return res.status(400).send({err:err})});
            if(created && customer){
                return res.status(200).send({
                    message:"customer save succes",
                    customer:customer,
                });
            }else if(!created && customer) return res.status(400).send({message:'the customer is already registered'});
            else return res.status(500).send({message:'server error'});
        }else return res.status(403).send({message:'you are not logged in'});
    },
    getCustomers:async function (req,res){
        var user = req.user;

        if(user){
            const customers = await Customer.findAll({ attributes:["id","ci","name","email","phone_number","active"] })
                .catch(err =>{ return res.status(400).send({err:err})});
                if(customers.length > 0){
                    return res.status(200).send({
                        message:"customers founds",
                        customers:customers, 
                    });
                }else return res.status(404).send({message:'any customers found'});
        }else return res.status(403).send({message:'you are not logged in'});
    },
    getActives:async function (req,res){
        var user = req.user;

        if(user){
            const customers = await Customer.findAll({ 
                where: { active: true },
                attributes:["id","ci","name","email","phone_number","active"] 
            }).catch(err =>{ return res.status(400).send({err:err})});
                if(customers){
                    return res.status(200).send({
                        message:"customers founds",
                        customers:customers, 
                    });
                }else return res.status(500).send({message:'server error'});
        }else return res.status(403).send({message:'you are not logged in'});
    },

    getOne:async function (req,res){
        var user = req.user;
        var params = req.params;

        if(user){
            const customer = await Customer.findByPk( 
                params.id,
                {
                    attributes:["id","ci","name","email","phone_number","address","qrcode"]
                }
            ).catch(err =>{ return res.status(400).send({err:err})});
            if(customer){
                return res.status(200).send({
                    message:"customer found",
                    customer:customer, 
                });
            }else return res.status(404).send({message:'Customer not found'});
        }else return res.status(403).send({message:'you are not logged in'});
    },
    search:async function (req,res){//OK
        var search = req.params.search;
        var user = req.user;
        if(user){
            if(search){
                var customers = await Customer.findAll({
                    where:{
                        [Op.or]: [
                            { name: { [Op.like]: search}},
                            { name: { [Op.startsWith]: search}},
                            { name: { [Op.endsWith]: search}},
                            { ci: { [Op.like]: search}},
                            { ci: { [Op.startsWith]: search}},
                            { ci: { [Op.endsWith]: search}},
                        ]
                    },
                    attributes:['id','name','ci','address'],
                }).catch(err =>{ return res.status(400).send({err:err})});
    
                if(customers.length > 0){
                    return res.status(200).send({
                        message:"matches:",
                        customers:customers,
                    });
                }else return res.status(404).send({message:'results not found'});
            } else return res.status(403).send({message:'search cant be empty'});
        }else return res.status(403).send({message:'you are not logged in'});
    },
    activateOne:async function (req,res){
        var user = req.user;
        var params = req.params;

        if(user){
            if(params.id){
                const customer = await Customer.findByPk(params.id).catch(err=>{ return res.status(403).send({err}) });
                if(customer && customer.active == false){
            
                    const activated = await Customer.update({ active : true },{
                        where: { id: params.id }
                    }).catch(err=>{ return res.status(403).send({err}) });
                    
                    if(activated) return res.status(200).send({ message:"user have been activated" });
                    else return res.status(500).send({message:"server error "});
                }else return res.status(400).send({message:"client allready active"});

            }else return res.status(403).send({message:'id is needed'});

        }else return res.status(403).send({message:'you are not logged in'});
    },
    desactivateOne:async function (req,res){
        var user = req.user;
        var params = req.params;

        if(user){
            if(params.id){
                const customer = await Customer.findByPk(params.id).catch(err=>{ return res.status(403).send({err}) });
                if(customer && customer.active == true){
            
                    const activated = await Customer.update({ active : false },{
                        where: { id: params.id }
                    }).catch(err=>{ return res.status(403).send({err}) });
                    
                    if(activated) return res.status(200).send({ message:"user have been desactivated" });
                    else return res.status(500).send({message:"server error "});
                }else return res.status(400).send({message:"client allready inactive"});

            }else return res.status(403).send({message:'id is needed'});

        }else return res.status(403).send({message:'you are not logged in'});
    },
}