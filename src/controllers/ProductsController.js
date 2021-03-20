const Product = require('../models/Product');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

class CoursesController {
  async createProduct(productData) {
    productData.name = productData.name.toLowerCase();

    await this.haveProductRegistered(productData.name);

    const createdProduct = await Product.create(productData);

    return createdProduct;
  }

  async haveProductRegistered(name) {
    const product = await Product.findOne({
      where: { name }
    });

    if (product) {
      throw new ConflictError('Produto');
    }

    return product;
  }

  async getProduct(id) {
    const product = await Product.findByPk(id);

    if (!product) {
      throw new NotFoundError('Produto');
    }

    return product;
  }

  getAllProducts() {
    return Product.findAll();
  }
}

module.exports = new CoursesController();
