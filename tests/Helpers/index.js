require('dotenv-flow').config({ silent: true });
const database = require('../../src/utils/database');

function convertToJson(entity) {
  entity[0][0].createdAt = entity[0][0].createdAt.toJSON();
  entity[0][0].updatedAt = entity[0][0].updatedAt.toJSON();
  return entity[0][0];
}

class Helpers {
  async createProduct(name, price) {
    let product = await database.query(`
      INSERT INTO products (name, price) VALUES ('${name}', '${price}') RETURNING *;
    `);
    product = convertToJson(product);

    return product;
  }

  async createClient(name, email, phone, birthDate) {
    let product = await database.query(`
      INSERT INTO clients (name, email, phone, "birthDate") VALUES ('${name}', '${email}', '${phone}', '${birthDate}') RETURNING *;
    `);

    product = convertToJson(product);

    return product;
  }

  eraseDatabase() {
    return database.query(`
      DELETE FROM "ordersProducts";
      DELETE FROM orders;
      DELETE FROM clients;
      DELETE FROM products;
    `);
  }
}
module.exports = new Helpers();
