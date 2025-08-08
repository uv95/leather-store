const mongoose = require('mongoose');
const {
  colors,
  leatherTypes,
  leatherTypeValues,
  colorValues,
} = require('../utils/consts');

const orderItemSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Order',
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
  priceAtPurchase: {
    type: Number,
    required: true,
  },
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;
