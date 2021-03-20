'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Meias',
        price: 2467
      },
      {
        name: 'Camisa',
        price: 7478
      },
      {
        name: 'Skate',
        price: 9444
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products');
  }
};
