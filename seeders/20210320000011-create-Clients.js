'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('clients', [
      {
        name: 'Robson Silva',
        email: 'robs@gmail.com',
        phone: '(32) 98765-4321',
        birthDate: '10/10/2000'
      },
      {
        name: 'Alex Cunha',
        email: 'alex@gmail.com',
        phone: '(34) 83465-7621',
        birthDate: '20/20/2002'
      },
      {
        name: 'Guilherme Ferro',
        email: 'gui@gmail.com',
        phone: '(32) 45675-4321',
        birthDate: '15/15/2001'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('clients');
  }
};
