const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class Product extends Sequelize.Model {}

Product.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'product'
  }
);

module.exports = Product;
