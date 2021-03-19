const express = require('express');

const ProductsController = require('../controllers/ProductsController');
const schemaMiddleware = require('../middlewares/schemaMiddleware');
const productSchemas = require('../schemas/productSchemas');
const Utils = require('../utils/Utils');

const router = express.Router();

router.post('/', schemaMiddleware(productSchemas.create), async (req, res) => {
  const sanitized = Utils.sanitizeHtml(req.body);
  const product = await ProductsController.createProduct(sanitized);

  return res.status(201).json(product);
});

router.get('/', async (req, res) => {
  const products = await ProductsController.getAllProducts(req.body);

  return res.status(200).json(products);
});

module.exports = router;
