'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductType extends Model {
    static associate(models) {
      ProductType.hasMany(models.Product, {
        as:'products', 
        foreignKey:'product_family',
        sourceKey:'id',
        onDelete:"CASCADE"
      });
    }
  };

  ProductType.init({

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
        notEmpty: true,
        notNull:true,
        notSpecial(value){
          if(value.includes("<") || value.includes(">") || value.includes("$")){
            throw new Error('especial characters not allow!');
          }
        },
        notEmpty(value){
          if(value && !value.trim()){
            throw new Error('Cant be null or empty');
          }
        }
      }
    },
  }, { sequelize,modelName: 'Product_Type',});

  return ProductType;
};