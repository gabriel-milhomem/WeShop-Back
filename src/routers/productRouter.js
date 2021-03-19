const express = require('express');

const ProductsController = require('../controllers/ProductsController');
const schemaMiddleware = require('../middlewares/schemaMiddleware');
const productSchemas = require('../schemas/productSchemas');

const router = express.Router();

router.post('/', schemaMiddleware(productSchemas.create), async (req, res) => {
  const product = await ProductsController.createProduct(req.body);

  return res.status(201).json(product);
});

module.exports = router;
