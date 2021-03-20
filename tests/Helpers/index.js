require('dotenv-flow').config({ silent: true });
const database = require('../../src/utils/database');

class Helpers {
  convertDateToJson(entity) {
    entity[0][0].createdAt = entity[0][0].createdAt.toJSON();
    entity[0][0].updatedAt = entity[0][0].updatedAt.toJSON();

    return entity[0][0];
  }

  async createProduct(name = 'televisão', price = 5000) {
    let product = await database.query(`
      INSERT INTO products (name, price) VALUES ('${name}', '${price}') RETURNING *;
    `);
    product = this.convertDateToJson(product);

    return product;
  }

  async createClient(
    name = 'Lee Si',
    email = 'li@si.com',
    phone = '(23) 34234-4232',
    birthDate = '03/03/2000'
  ) {
    let client = await database.query(`
      INSERT INTO clients (name, email, phone, "birthDate") VALUES ('${name}', '${email}', '${phone}', '${birthDate}') RETURNING *;
    `);

    client = this.convertDateToJson(client);

    return client;
  }

  async createOrder(clientId, productId, quantity = 2) {
    let order = await database.query(`
      INSERT INTO orders ("clientId") VALUES ('${clientId}') RETURNING *;
    `);

    order = this.convertDateToJson(order);

    const ordersProduct = await database.query(`
      INSERT INTO "ordersProducts" ("productId", "orderId", quantity) VALUES ('${productId}', '${order.id}','${quantity}') RETURNING *;
    `);

    return { order, ordersProduct };
  }

  eraseDatabase() {
    return database.query(`
      DELETE FROM "ordersProducts";
      DELETE FROM orders;
      DELETE FROM products;
      DELETE FROM clients;
    `);
  }
}
module.exports = new Helpers();
