const Order = require('../models/orderModel');
const Address = require('../models/addressModel');
const Cart = require('../models/cartModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    status: 'success',
    data: { data: orders },
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const user = req.user.id;
  const addressId = req.body.address;
  const cart = await Cart.findOne({ user });
  const items = cart.items.map((item) => {
    return {
      quantity: item.quantity,
      total: item.total,
      name: item.name,
      colors: item.colors,
    };
  });
  const userAddresses = await Address.find({
    user,
  });

  if (!cart) {
    return next(new AppError('No cart found!', 404));
  }
  if (!userAddresses.some((address) => addressId === address.id)) {
    return next(new AppError('No address found!', 404));
  }

  const newOrder = await Order.create({
    ...req.body,
    user,
    items,
    addressId,
  });

  res.status(201).json({
    status: 'success',
    data: { data: newOrder },
  });
});

exports.getAllOrders = factory.getAll(Order, { path: 'address' });
exports.getOneOrder = factory.getOne(Order, { path: 'cart' });
exports.updateOrder = factory.updateOne(Order);
exports.cancelOrder = factory.deleteOne(Order);
