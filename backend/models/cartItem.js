const mongoose = require('mongoose');
const {
  colors,
  leatherTypes,
  leatherTypeValues,
  colorValues,
} = require('../utils/consts');

const cartItemSchema = new mongoose.Schema({
  cartId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Cart',
  },
  itemId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Item',
  },
  colors: {
    leather: {
      type: String,
      enum: {
        values: colorValues,
      },
      required: true,
      default: colors.BLACK,
    },
    thread: {
      type: String,
      enum: {
        values: colorValues,
      },
      required: true,
      default: colors.BLACK,
    },
  },
  leatherType: {
    type: String,
    enum: {
      values: leatherTypeValues,
    },
    required: true,
    default: leatherTypes.CRAZY_HORSE,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
