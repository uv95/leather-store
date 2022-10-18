const Order = require('../models/orderModel');
const factory = require('./handlerFactory');

exports.getAllOrders = factory.getAll(Order);
exports.createOrder = factory.createOne(Order);
exports.getOneOrder = factory.getOne(Order, { path: 'cart' });
exports.updateOrder = factory.updateOne(Order);
exports.cancelOrder = factory.deleteOne(Order);
