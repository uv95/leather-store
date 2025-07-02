const mongoose = require('mongoose');
const slugify = require('slugify');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
    // minLength: [10, 'Name is too short'],
  },
  slug: String,
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: {
      values: ['Wallets and cardholders', 'Eyeglass cases', 'Passport covers'],
      message: 'Please specify an existing item type',
    },
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  imageCover: {
    type: String,
    required: [true, 'Item must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

itemSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
