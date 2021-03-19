const { Sequelize } = require('sequelize');
const sequelize = require('../../utils/database');

class OrdersProduct extends Sequelize.Model {}

OrdersProduct.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'ordersProduct'
  }
);

module.exports = OrdersProduct;
