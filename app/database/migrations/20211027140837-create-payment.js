'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      payment_type:{
        type: Sequelize.DataTypes.STRING
      },
      iva:{
        type: Sequelize.DataTypes.FLOAT,
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
        type: Sequelize.DataTypes.FLOAT,
        validate:{
          isNumeric: true,
        },
      },
      total:{
        type: Sequelize.DataTypes.FLOAT,
        validate:{
          isNumeric: true,
        },
      },
      status:{ //pago o no 
        type: Sequelize.DataTypes.BOOLEAN,
      },
      customer_id:{
        type: Sequelize.DataTypes.INTEGER,
        through: {
          model:'Invoice',
          references: {
            model: 'Customer',
            key: 'id'
          },
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
    await queryInterface.dropTable('Payments');
  }
};