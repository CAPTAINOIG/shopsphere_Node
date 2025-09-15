// models/UserProduct.js

const mongoose = require('mongoose');

const userProductSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Associate with a user
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Store clicked product
  clickedAt: { type: Date, default: Date.now }, // Timestamp when clicked
});

module.exports = mongoose.model('UserProduct', userProductSchema);
