const Order = require('../models/Order');
const Client = require('../models/Client');
const Product = require('../models/Product');
const OrdersProduct = require('../models/OrdersProduct');
const Utils = require('../utils/Utils');
const NotFoundError = require('../errors/NotFoundError');

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

  async destroyOrder(id) {
    const order = await Order.findByPk(id);

    if (!order) {
      throw new NotFoundError('Pedido');
    }

    await OrdersProduct.destroy({ where: { orderId: id } });
    await order.destroy();
  }
}

module.exports = new OrdersController();
