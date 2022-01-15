'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class StockMove extends Model {

    static associate(models) {
      StockMove.belongsTo(models.User,{
        as:'user',
        foreignKey:'user_id',
        sourceKey:'id'});

        StockMove.belongsTo(models.Product,{
        as:'product',
        foreignKey:'product_id',
        sourceKey:'id'});
    }        
  };

  StockMove.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    operation: {
      allowNull: false,
      type: DataTypes.STRING,
      validate:{
        notSpecial(value){
          if(value.includes("<") || value.includes(">")){
            throw new Error('especial characters not allow!');
          }
        },
        notEmpty(value){
          if(value == "" || value ==" " || value ==null || value == undefined){
            throw new Error('Cant be null or empy');
          }
        }
      }
    },
    move_quantity:{
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
    description:{
      type: DataTypes.TEXT,
      validate:{
        notSpecial(value){
          if(value.includes("<") || value.includes(">")){
            throw new Error('especial characters not allow!');
          }
        },
      }
    },
  }, {
    sequelize,
    modelName: 'StockMove',
  });
  return StockMove;
};