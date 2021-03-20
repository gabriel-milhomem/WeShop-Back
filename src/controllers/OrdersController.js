const Order = require('../models/Order');
const Client = require('../models/Client');
const Product = require('../models/Product');
const OrdersProduct = require('../models/OrdersProduct');
const Utils = require('../utils/Utils');

class OrdersController {
  async getAllOrders() {
    let orders = await Order.findAll({
      include: [
        {
          model: Client
        },
        {
          model: Product,
          through: { attributes: ['quantity'] }
        }
      ]
    });

    orders = JSON.parse(JSON.stringify(orders));
    const allOrders = orders.map(order => Utils.putTotalAndPartialPrice(order));

    return allOrders;
  }
}

module.exports = new OrdersController();
