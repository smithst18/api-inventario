'use strict';
const { Model } = require('sequelize');
module.exports = ( sequelize, DataTypes ) => {
  class ProductNotification extends Model {
    static associate(models) {
      ProductNotification.belongsTo(models.Product,{
        as:'item',
        foreignKey:'product_id',
        sourceKey:'id'
      });
    }
  };
  ProductNotification.init({
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    value_to_report:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
          isNumeric: true,
          len: [1,1_000_000_000],
          isEven(value) {
            if (value < 1) {
              throw new Error('quantity must be 1 or higher');
            }
          }
      }
    },
    status:{
      type:DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Product_Notification',
  });
  return ProductNotification;
};