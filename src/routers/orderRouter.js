const express = require('express');

const OrdersController = require('../controllers/OrdersController');
const schemaMiddleware = require('../middlewares/schemaMiddleware');
const orderSchemas = require('../schemas/orderSchemas');

const router = express.Router();

router.get('/', async (req, res) => {
  const orders = await OrdersController.getAllOrders(req.body);

  return res.status(200).json(orders);
});

module.exports = router;
