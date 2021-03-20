'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const clients = await queryInterface.sequelize.query(
      `SELECT id FROM clients;`
    );

    await queryInterface.bulkInsert('orders', [
      {
        clientId: clients[0][0].id
      },
      {
        clientId: clients[0][0].id
      },
      {
        clientId: clients[0][1].id
      }
    ]);

    const orders = await queryInterface.sequelize.query(
      `SELECT id FROM orders;`
    );

    const products = await queryInterface.sequelize.query(
      `SELECT id FROM products;`
    );

    await queryInterface.bulkInsert('ordersProducts', [
      {
        productId: products[0][0].id,
        quantity: 1,
        orderId: orders[0][0].id
      },
      {
        productId: products[0][2].id,
        quantity: 2,
        orderId: orders[0][1].id
      },
      {
        productId: products[0][1].id,
        quantity: 3,
        orderId: orders[0][1].id
      },
      {
        productId: products[0][0].id,
        quantity: 1,
        orderId: orders[0][2].id
      },
      {
        productId: products[0][1].id,
        quantity: 1,
        orderId: orders[0][2].id
      },
      {
        productId: products[0][2].id,
        quantity: 2,
        orderId: orders[0][2].id
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ordersProducts');
    await queryInterface.bulkDelete('orders');
  }
};
