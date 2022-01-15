'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    
    static associate(models) {}
  };
  Invoice.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    PaymentId:{
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    ProductPaymentId:{
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};