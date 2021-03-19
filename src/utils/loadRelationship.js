const Product = require('../models/Product');
const Order = require('../models/Order');
const OrdersProduct = require('../models/OrdersProduct');
const Client = require('../models/Client');

Product.belongsToMany(Order, { through: OrdersProduct });
Order.belongsToMany(Product, { through: OrdersProduct });

Client.hasMany(Order);
Order.belongsTo(Client);
