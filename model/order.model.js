const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  cart: [
    {
      id: { type: String },
      name: { type: String },
      price: { type: Number},
      quantity: { type: Number},
      category: {type: String},
    }
  ],
  totalAmount: { type: Number},
  orderDate: {type: String, default: () => new Date().toLocaleDateString()},
  time: {type: String, default: () => new Date().toLocaleTimeString()},
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
