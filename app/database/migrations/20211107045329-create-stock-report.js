'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StockMove', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      operation: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
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
        type: Sequelize.DataTypes.INTEGER,
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
        type: Sequelize.DataTypes.TEXT,
        validate:{
          notSpecial(value){
            if(value.includes("<") || value.includes(">")){
              throw new Error('especial characters not allow!');
            }
          },
        }
      },
      product_id:{
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Product',
          key: 'id'
        },
        allowNull: false
      },
      user_id:{
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model:  'User',
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
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StockMove');
  }
};