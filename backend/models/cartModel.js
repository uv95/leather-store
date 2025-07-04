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
          enum: colors,
          default: 'Black',
          required: true,
        },
        threadsColor: {
          type: String,
          enum: colors,
          default: 'Black',
          required: true,
        },
      },
      leather: {
        enum: ['Crazy Horse', 'Nappa', 'Pull Up'],
        default: 'Crazy Horse',
        type: String,
        required: true,
      },
      imageCover: String,
      images: [String],
      price: {
        type: Number,
      },
      total: {
        type: Number,
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
