const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  total: Number,
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  addressId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Address',
    required: [true, 'Please provide a delivery address'],
  },
  status: {
    type: String,
    enum: ['Awaiting payment', 'In progress', 'Completed'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
