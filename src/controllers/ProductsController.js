const Product = require('../models/Product');
const ConflictError = require('../errors/ConflictError');

class CoursesController {
  async createProduct(productData) {
    productData.name = productData.name.toLowerCase();

    const product = await Product.findOne({
      where: { name: productData.name }
    });

    if (product) {
      throw new ConflictError('Produto');
    }

    const createdCourse = await Product.create(productData);

    return createdCourse;
  }

  getAllProducts() {
    return Product.findAll();
  }
}

module.exports = new CoursesController();
