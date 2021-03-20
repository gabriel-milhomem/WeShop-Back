const express = require('express');

const OrdersController = require('../controllers/OrdersController');
const schemaMiddleware = require('../middlewares/schemaMiddleware');
const orderMiddleware = require('../middlewares/orderMiddleware');
const orderSchemas = require('../schemas/orderSchemas');

const router = express.Router();

router.get('/', async (req, res) => {
  const orders = await OrdersController.getAllOrders(req.body);

  return res.status(200).json(orders);
});

router.delete('/:id', async (req, res) => {
  const id = +req.params.id;
  await OrdersController.destroyOrder(id);

  return res.sendStatus(204);
});

router.post(
  '/',
  schemaMiddleware(orderSchemas.create),
  orderMiddleware,
  async (req, res) => {
    const order = await OrdersController.createOrder(req.body);

    return res.status(201).json(order);
  }
);

router.put(
  '/:id',
  schemaMiddleware(orderSchemas.update),
  orderMiddleware,
  async (req, res) => {
    const id = +req.params.id;

    const order = await OrdersController.updateOrder(id, req.body);

    return res.status(200).json(order);
  }
);

module.exports = router;
