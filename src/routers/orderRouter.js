const express = require('express');

const OrdersController = require('../controllers/OrdersController');
const schemaMiddleware = require('../middlewares/schemaMiddleware');
const orderMiddleware = require('../middlewares/orderMiddleware');
const orderSchemas = require('../schemas/orderSchemas');

const router = express.Router();

router.get('/', async (req, res) => {
  const orders = await OrdersController.getAllOrders();

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
    await OrdersController.createOrder(req.body);

    return res.sendStatus(201);
  }
);

router.put(
  '/:id',
  schemaMiddleware(orderSchemas.update),
  orderMiddleware,
  async (req, res) => {
    const id = +req.params.id;

    await OrdersController.updateOrder(id, req.body);

    return res.sendStatus(200);
  }
);

module.exports = router;
