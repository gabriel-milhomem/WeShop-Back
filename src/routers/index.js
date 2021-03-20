const express = require('express');

const orderRouter = require('./orderRouter');
const clientRouter = require('./clientRouter');
const productRouter = require('./productRouter');

const router = express.Router();

router.use('/orders', orderRouter);
router.use('/clients', clientRouter);
router.use('/products', productRouter);

module.exports = router;
