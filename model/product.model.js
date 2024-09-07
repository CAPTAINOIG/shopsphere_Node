const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    availableQuantity: { type: Number, required: true, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    images: {
        front: { type: String },
        back: { type: String },
        side: { type: String },
        additional: { type: String }
    },
    stock: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})


// Optional: Method to calculate total price of the cart
// cartSchema.methods.getTotalPrice = function () {
//     return this.products.reduce((total, item) => {
//         return total + (item.quantity * item.product.price);
//     }, 0);
// };
const Product = mongoose.model('Product', productSchema);
module.exports = Product;