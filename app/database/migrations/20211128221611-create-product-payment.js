'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductPayments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      product_name:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      product_qty:{
        type: Sequelize.DataTypes.INTEGER,
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
        type: Sequelize.DataTypes.INTEGER,
        validate:{
          isNumeric: true,
          isEven(value) {
            if (value < 1) {
              throw new Error('price must be 1 or higher');
            }
          }
        },
      },
      product_id:{
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Product',
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
    await queryInterface.dropTable('ProductPayments');
  }
};