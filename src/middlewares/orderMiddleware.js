const ClientsController = require('../controllers/ClientsController');
const ProductControllers = require('../controllers/ProductsController');

async function orderMiddleware(req, res, next) {
  const { clientId, orders } = req.body;

  await ClientsController.getClient(clientId);
  await Promise.all(
    orders.map(order => ProductControllers.getProduct(order.productId))
  );

  return next();
}

module.exports = orderMiddleware;
