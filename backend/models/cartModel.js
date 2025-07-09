const mongoose = require('mongoose');

const colors = [
  'black',
  'red',
  'blue',
  'brown',
  'ginger',
  'burgundy',
  'green',
  'grey',
  'khaki',
];

const cartSchema = new mongoose.Schema({
  items: [
    {
      item: { type: mongoose.Schema.ObjectId, ref: 'Item' },
      quantity: {
        type: Number,
        min: [1, 'Cannot be less than 1'],
        default: 1,
        required: true,
      },
      colors: {
        leatherColor: {
          type: String,
          enum: colors,
          default: 'black',
          required: true,
        },
        threadsColor: {
          type: String,
          enum: colors,
          default: 'black',
          required: true,
        },
      },
      leather: {
        enum: ['Crazy Horse', 'Nappa', 'Pull Up'],
        default: 'Crazy Horse',
        type: String,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  totalQuantity: {
    type: Number,
    required: true,
    default: 1,
  },
  total: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
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
cartSchema.pre('save', function (next) {
  this.totalQuantity = this.items
    .map((item) => item.quantity)
    .reduce((prev, curr) => prev + curr, 0);

  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
