'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductPayment extends Model {
    static associate(models) {
      ProductPayment.belongsTo(models.Product,{
        as:'paidProduct',
        foreignKey:'product_id',
        sourceKey:'id'
      });
      ProductPayment.belongsToMany(models.Payment, {
        through: "Invoice",
        onDelete:"CASCADE"
      });
    }
  };
  ProductPayment.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    product_name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_qty:{
      type: DataTypes.INTEGER,
      validate:{
        isNumeric: true,
        isEven(value) {
          if (value < 1) {
            throw new Error('qty must be 1 or higher');
          }
        }
      },
    },
    product_price:{
      type: DataTypes.INTEGER,
      validate:{
        isNumeric: true,
        isEven(value) {
          if (value < 1) {
            throw new Error('price must be 1 or higher');
          }
        }
      },
    },
  }, {
    sequelize,
    modelName: 'Product_Payment',
  });
  return ProductPayment;
};