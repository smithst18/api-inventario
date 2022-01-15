'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      PaymentId:{
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model:'Payment',
          key: 'id'
        },
        allowNull: false
      },
      ProductPaymentId:{
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Product_Payment',
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
    await queryInterface.dropTable('Invoices');
  }
};