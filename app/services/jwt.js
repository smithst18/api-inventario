'use strict';
var jwt = require('jsonwebtoken');
var secret  = process.env.SECRET_KEY;

exports.createToken = function(user){

    var payload = {
        sub: user.id,//id
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone_number: user.phone_number,
        qrcode: user.qrcode,
        role: user.role,
        //token date creacion 
        //token date expiration are generated automatically by the jwt out of the object payload
    }
    
    var token = jwt.sign({
        payload
      }, secret, { expiresIn: 60*60*48 } );

    return token;
};

