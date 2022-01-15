'use strict'
var jwt = require('jsonwebtoken');
var secret  = process.env.SECRET_KEY;

exports.authentication = function(req,res,next){
   var header =  req.headers.authorization;
   
    if(!header){
        return res.status(403).send({message:"header Authorization is missing"});
    }
    var token = header.replace(/['"]+/g, '');

    jwt.verify(token,secret , function (err,decode) {
        if(decode){
            req.user = decode;
            next();
        }else if(err){
            return res.status(401).send({
                err: err,
            });
        }
    });
}