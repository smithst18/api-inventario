'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class Customer extends Model {

    static associate(models) {
      Customer.hasMany(models.Payment, {
        as:'client', 
        foreignKey:'customer_id',
        sourceKey:'id'
      });
    }
  };
  Customer.init({

    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty(value){
          if(value == "" || value ==" " || value ==null || value ==undefined){
            throw new Error('Cant be null or empty');
          }
        },
        notSpecial(value){
          if(value.includes("<") || value.includes(">")){
            throw new Error('especial characters not allow!');
          }
        },
      }
    },
    ci:{
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate:{
        //is: /^[V|E]-[0-9]{5,9}$/gim, 
        is: /^[0-9]{5,9}$/gim, 
        notEmpty(value){
          if(value && !value.trim()){
            throw new Error('Cant be null or empty');
          }
        },
        notSpecial(value){
          if(value.includes("<") || value.includes(">")){
            throw new Error('especial characters not allow!');
          }
        },
      }
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate:{
        isEmail: true,
        notEmpty(value){
          if(value == "" || value ==" " || value ==null || value ==undefined){
            throw new Error('Cant be null or empty');
          }
        },
        notSpecial(value){
          if(value.includes("<") || value.includes(">")){
            throw new Error('especial characters not allow!');
          }
        },
      },
    },
    phone_number:{
      type: DataTypes.STRING,
      unique:true,
      validate:{
        len: [11],
        notEmpty(value){
          if(value == "" || value ==" " || value ==null || value ==undefined){
            throw new Error('Cant be null or empty');
          }
        },
        notSpecial(value){
          if(value.includes("<") || value.includes(">")){
            throw new Error('especial characters not allow!');
          }
        },
      }
    },
    address:{
      type: DataTypes.TEXT,
      allowNull: true,
      validate:{
        notSpecial(value){
          if(value.includes("<") || value.includes(">")){
            throw new Error('especial characters not allow!');
          }
        },
      }
    },
    qrcode: {
      type: DataTypes.TEXT,
      // allowNull defaults to true
    },
    active: {
      type: DataTypes.BOOLEAN,
      // allowNull defaults to true
    },

  }, { sequelize,modelName: 'Customer'});
  return Customer;
};