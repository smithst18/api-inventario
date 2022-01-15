'use strict'
var { Customer } = require('../models/index');
var qrcode  = require('qrcode');

module.exports = {

    makeQR: async function (req,res)    {
        var params = req.body;
        var user = req.user;
        //if user is logged
        if(user && user.payload.name){
            //if customer exist and have not  and qrcode yet
            const customer = await Customer.findByPk(params.id)
                .catch( e =>{ return res.status(400).send({message:`error creando qr ${e}`})});
            if(customer){
                //if(customer.qrcode == null){
                    //if originroute exist then we generate de qr code and storage in the customer
                    if(params != null){
                        params.qrcode = null;
                        let user = JSON.stringify(params);
                        var url = `${user}`;
                        var opts = {
                            errorCorrectionLevel: 'H',
                            type: 'image/jpeg',
                            quality: 0.3,
                            margin: 1,
                            color: {
                              dark:"#000000",
                              light:"none"
                            }
                        };
                        var QRCode = await qrcode.toDataURL(url,opts)
                        .catch(e =>{ return res.status(400).send({error:e})});
                        if(QRCode){
                            customer.set({
                                qrcode:QRCode
                            });
                            //save the qr in the instance of the Client object
                            await customer.save()
                                .catch(e =>{ 
                                    return res.status(500).send({message:"an error has occured saving qrcode"})});
                            return res.status(200).send({qrcode:QRCode});
                        }else return res.status(500).send({message:"an error has occurred"});
                    }else return res.status(400).send({message:"parametros vacios"});
                //}else return res.status(403).send({message:"the customer already have a QRCODE"});
            }else return res.status(404).send({message:"customer not found"});
        }else return res.status(403).send({message:"you are not logged in"});
    },
    
/*  var url = `localhost:3001/api/QR/${user.name}/${id}`;
    var QR = await QRCode.toDataURL(url); */
    //by the pk change de qr status of the user in the database
    statusQR: async function (req,res){
        var id = req.params.id;
        var auth = req.user;

        if(auth.role === 'user_receptionist'){

            var user = await User.findByPk(id)
            .catch(err =>{
                return res.status(404).send(`user not found  ${err}`);
            });
            //if user exist and id is not null 
            if(user && id){
                //  the user is not active 
                if(user.active == false || user.active == null){
                    User.update({active: true},{where:{id:id}})
                        .then(User =>{
                            return res.status(200).send({message:`the user ${user.name} is now active `});
                        })
                        .catch(err=>{
                            return res.status(404).send({error:err});
                        });
                }else{
                    User.update({active: false},{where:{id:id}})
                        .then(User =>{
                            return res.status(200).send({message:`the user ${user.name} is now inactive `});
                        })
                        .catch(err=>{
                            return res.status(404).send({ error:err});
                        });
                }
            }else{
                return res.status(400).send({message:`id is empty or wrong id  => (${id})`});
            }
        }
    },
};
