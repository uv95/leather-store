const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.ObjectId,
    ref: 'Item',
  },
  quantity: Number,
  colors: {
    type: mongoose.Schema.ObjectId,
    ref: 'Colors',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Пожалуйста, зарегистрируйтесь'],
  },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
