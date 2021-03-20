const express = require('express');

const OrdersController = require('../controllers/OrdersController');
const schemaMiddleware = require('../middlewares/schemaMiddleware');
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

module.exports = router;
