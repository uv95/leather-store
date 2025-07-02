const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: [true, 'Please specify a city'],
  },
  address: {
    type: String,
    required: [true, 'Please provide the full address'],
  },
  zipcode: {
    type: String,
    required: [true, 'Please provide a postal code'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Address must belong to the user'],
  },
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
