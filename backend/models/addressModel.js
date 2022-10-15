const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: [true, 'Укажите город'],
  },
  address: {
    type: String,
    required: [true, 'Укажите полный адрес'],
  },
  zipcode: {
    type: Number,
    required: [true, 'Укажите индекс'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
