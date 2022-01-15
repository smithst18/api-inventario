'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Customers', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        type: Sequelize.DataTypes.STRING,
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
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate:{
          is: /^[V|E]-[0-9]{5,9}$/gim, 
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
      email:{
        type: Sequelize.DataTypes.STRING,
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
        type: Sequelize.DataTypes.STRING,
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
        type: Sequelize.DataTypes.TEXT,
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
        type: Sequelize.DataTypes.TEXT,
        // allowNull defaults to true
      },
      active: {
        type: Sequelize.DataTypes.BOOLEAN,
        // allowNull defaults to true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Customers');
  }
};