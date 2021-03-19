const express = require('express');

const ClientsController = require('../controllers/ClientsController');
const schemaMiddleware = require('../middlewares/schemaMiddleware');
const clientSchemas = require('../schemas/clientSchemas');

const router = express.Router();

router.post('/', schemaMiddleware(clientSchemas.create), async (req, res) => {
  const product = await ClientsController.createClient(req.body);

  return res.status(201).json(product);
});

router.get('/', async (req, res) => {
  const clients = await ClientsController.getAllClients(req.body);

  return res.status(200).json(clients);
});

module.exports = router;
