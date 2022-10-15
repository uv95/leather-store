const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.ObjectId, ref: 'CartItem' }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    // required: [true, 'Пожалуйста, зарегистрируйтесь'],
  },
  address: {
    type: mongoose.Schema.ObjectId,
    ref: 'Address',
    required: [true, 'Пожалуйста, укажите адрес доставки'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;