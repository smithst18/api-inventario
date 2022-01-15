'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('Product_Type', {
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
          notEmpty: true,
          notNull:true,
          notSpecial(value){
            if(value.includes("<") || value.includes(">") || value.includes("$")){
              throw new Error('especial characters not allow!');
            }
          },
          notEmpty(value){
            if(value == "" || value ==" " || value ==null || value ==undefined){
              throw new Error('Cant be null or empty');
            }
          }
        }
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
    await queryInterface.dropTable('Product_Type');
  }
};