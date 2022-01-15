'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Product_Types', [
      {
        name:'comidas',      
        createdAt: new Date(),
        updatedAt: new Date(),
        
      },
      {
        name:'bebidas',      
        createdAt: new Date(),
        updatedAt: new Date(),
        
      },
      {
        name:'ropa',      
        createdAt: new Date(),
        updatedAt: new Date(),
        
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_types', null, {});
  }
};
