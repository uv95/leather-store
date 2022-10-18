const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  items: [
    {
      itemId: { type: mongoose.Schema.ObjectId, ref: 'Item' },
      name: String,
      quantity: {
        type: Number,
        min: [1, 'Cannot be less than 1'],
        default: 1,
        required: true,
      },
      colors: {
        leatherColor: {
          type: String,
          enum: ['черный', 'красный', 'синий'],
          default: 'черный',
          required: true,
        },
        threadsColor: {
          type: String,
          enum: ['черный', 'красный', 'синий'],
          default: 'черный',
          required: true,
        },
      },
      price: {
        type: Number,
      },
      total: {
        type: Number,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Адрес должен принадлежать пользователю'],
  },
});

cartSchema.pre('save', function (next) {
  this.items.forEach((item) => (item.total = item.price * item.quantity));
  next();
});

cartSchema.pre('save', function (next) {
  this.total = this.items
    .map((item) => item.total)
    .reduce((prev, curr) => prev + curr, 0);

  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
