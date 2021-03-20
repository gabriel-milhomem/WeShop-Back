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

  async createOrder(data) {
    const { clientId, orders } = data;
    const purchase = await Order.create({ clientId });

    const allConnections = orders.map(order => ({
      ...order,
      orderId: purchase.id
    }));
    await OrdersProduct.bulkCreate(allConnections);

    const order = await this.getOrder(purchase.id);
    return order;
  }

  async getOrder(id) {
    const order = await Order.findByPk(id, { include: Product });

    if (!order) {
      throw new NotFoundError('Pedido');
    }

    return order;
  }

  async destroyOrder(id) {
    const order = await this.getOrder(id);

    await OrdersProduct.destroy({ where: { orderId: id } });
    await order.destroy();
  }

  async updateOrder(id, data) {
    await this.getOrder(id);

    await OrdersProduct.destroy({ where: { orderId: id } });

    const allConnections = data.orders.map(order => ({
      ...order,
      orderId: id
    }));

    await OrdersProduct.bulkCreate(allConnections);
    const order = await this.getOrder(id);

    return order;
  }
}

module.exports = new OrdersController();
