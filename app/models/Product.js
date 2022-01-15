'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Product_Type,{
        as:'family',
        foreignKey:'product_family',
        sourceKey:'id'
      });

      Product.hasMany(models.StockMove, {
        as:'moves', 
        foreignKey:'product_id',
        sourceKey:'id'
      });

      Product.hasOne(models.Product_Notification, {
        as:'notification', 
        foreignKey:'product_id',
        sourceKey:'id'
      });

      Product.hasMany(models.Product_Payment, {
        as:'prodt', 
        foreignKey:'product_id',
        sourceKey:'id'
      });
    }                                   
  };

  Product.init({

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
        }
      }
    },
    price:{
      type: DataTypes.FLOAT,
      allowNull: false,
      validate:{
        len: [0.1,10_000],
        isEven(value) {
          if (value < 0.1) {
            throw new Error('price must be 0.1$ or higher');
          }
        },
      }
    },
    product_code:{
      type: DataTypes.STRING,
      unique:true,
      allowNull: false,
      validate:{
        isAlphanumeric: true,
        notEmpty(value){
          if(value == "" || value ==" " || value ==null || value ==undefined){
            throw new Error('Cant be null or empty');
          }
        }
      }
    },
    product_quantity:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
          isNumeric: true,
          len: [0,1_000_000_000],
          isEven(value) {
            if (value < 0) {
              throw new Error('quantity must be 0 or higher');
            }
          }
      }
    },
    active_notification:{
      type: DataTypes.BOOLEAN,
    }
  }, {sequelize,modelName: 'Product',});

  return Product;
};