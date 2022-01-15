'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Notifications', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      value_to_report:{
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
      status:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
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
    await queryInterface.dropTable('Notifications');
  }
};