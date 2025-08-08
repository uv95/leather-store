const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
