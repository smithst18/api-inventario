'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class User extends Model {

    static associate(models) {
      User.hasMany(models.StockMove, {
        as:'stockMoves', 
        foreignKey:'user_id',
        sourceKey:'id'
      });
    }
  };

  User.init({
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
        isAlpha: true
      }
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isAlpha: true
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  }, { sequelize,modelName: 'User',});
  return User;
};