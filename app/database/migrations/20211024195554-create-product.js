'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      
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
          }
        }
      },
      price:{
        type: Sequelize.DataTypes.FLOAT,
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
        type: Sequelize.DataTypes.STRING,
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
        type: Sequelize.DataTypes.INTEGER,
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
        type: Sequelize.DataTypes.BOOLEAN,
      },
      product_family:{
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Product_Type',
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};