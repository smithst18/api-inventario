'use strict';
var bcrypt = require('bcrypt');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name:'admin', 
        surname:'admin',
        password: bcrypt.hashSync('0212', 5),  
        role: 'user_admin', 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'cajero',  
        surname:'cajero',
        password: bcrypt.hashSync('0212', 5),  
        role: 'user_cashier', 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'receptionist',  
        surname:'receptionist',
        password: bcrypt.hashSync('0212', 5), 
        role: 'user_receptionist', 
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
