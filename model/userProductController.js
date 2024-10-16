// // userProductController.js

// const UserProduct = require('../models/UserProduct');

// // Save clicked product
// exports.saveClickedProduct = async (req, res) => {
//   const { userId, productId } = req.body; // Get userId and productId from the request body
//   try {
//     const newUserProduct = new UserProduct({ userId, productId });
//     await newUserProduct.save();
//     res.status(201).json({ message: 'Product saved successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error saving product', error });
//   }
// };

// exports.getUserClickedProducts = async (req, res) => {
//   const { userId } = req.params; // Get userId from request params
//   try {
//     const clickedProducts = await UserProduct.find({ userId }).populate('productId'); // Populate product details
//     res.status(200).json(clickedProducts);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching clicked products', error });
//   }
// };
