'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsToMany(models.Product_Payment, {
        through: "Invoice",
        onDelete:"CASCADE"
      });
      Payment.belongsTo(models.Customer,{
        as:'client',
        foreignKey:'customer_id',
        sourceKey:'id'
      });
    }
  };

  Payment.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    payment_type:{
      type: DataTypes.STRING
    },
    iva:{
      type: DataTypes.FLOAT,
      validate:{
        isNumeric: true,
        isEven(value) {
          if (value < 0.5) {
            throw new Error('IVA must be 0.5 or higher');
          }
        }
      },
    },
    sub_total:{
      type: DataTypes.FLOAT,
      validate:{
        isNumeric: true,
      },
    },
    total:{
      type: DataTypes.FLOAT,
      validate:{
        isNumeric: true,
      },
    },
    status:{ //pago o no 
      type: DataTypes.BOOLEAN,
    },
    customer_id:{
      allowNull: false,
      type: DataTypes.INTEGER,
    },

  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};