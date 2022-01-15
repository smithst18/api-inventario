'use strict'
const { User } = require('../models/index');

//password encript
const bcrypt = require('bcrypt');
const saltRounds = 5;
const validator = require('validator');
var jwt = require('../services/jwt');

module.exports = {

    login: async function (req,res) {
        // params 
        var params = req.body;
        try{
            var validName = !validator.isEmpty(params.name);
            var validPass = !validator.isEmpty(params.password);
        }catch(err){
            return res.status(403).send({
                message:`invalid data ${err}`,
            }); 
        }
        var user = await User.findOne({where:{name:params.name}}).catch(err =>{
            return res.status(400).send({err :err});
        });

        if(user){
            const match = await bcrypt.compare(params.password,user.password);

            if(match){
                if(params.gettoken){
                    var token = jwt.createToken(user);
                    return res.status(200).send({token:token});
                }else{
                    user.password = null;
                    return res.status(200).send({
                        message:"success",
                        user:user
                    });
                }

            }else return res.status(403).send({message:"wrong password"});

        } else return res.status(404).send({message:"User not found"}); 
    },
};
/*if(params.password === params.repassword){
                //encript password
                const salt = bcrypt.genSaltSync(saltRounds);
                passwordHash = bcrypt.hashSync(params.password, salt);
            }else{ 
                return res.status(400).send({message:'passwords don\'t match'});
            }
*/