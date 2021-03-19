const { Sequelize } = require('sequelize');
const sequelize = require('../../utils/database');

class Order extends Sequelize.Model {}

Order.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true
    },
    clientId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'order'
  }
);

module.exports = Order;
