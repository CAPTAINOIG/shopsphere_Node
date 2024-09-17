const express = require('express');
const Cart = require('../model/cart.model');
const Product = require('../model/product.model');
const User = require('../model/user.model');
const Order = require('../model/order.model');
const data = require('../Data/categories');
const verifyToken = require('../middleware/verifyToken');


const checkout = async (req, res) => {
    const { user, cart } = req.body;
    console.log(user);
    console.log( cart);

    try {
        // Step 1: Find or create the user in the database
        let existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
            existingUser = new User({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
            });
            await existingUser.save();
        }
        // Step 2: Calculate the total amount for the order
        const totalAmount = cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
        console.log(totalAmount);
        // Step 3: Create a new order and save it to the database
        const newOrder = new Order({
            user: existingUser._id,
            cart: cart,
            totalAmount: totalAmount
        });
        await newOrder.save();
        res.status(201).json({ message: 'Order processed successfully', order: newOrder });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred', error });
    }
}

const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    const details = new Product({ userId, productId, quantity })
    console.log(details);

    try {
        // let product = data.find(prod => prod._id === productId);
        // / Fetch the product from the database
        // let product = await Product.findById(productId);
        // if (!product) {
        //     return res.status(404).json({ message: 'Product not found' });
        // }

        // if (product.availableQuantity < quantity) {
        //     return res.status(400).json({ message: 'Insufficient stock' });
        // }


        let product = await Product.findById(productId);

        if (!product) {
            // If the product is not found, you can add some default or placeholder values instead
            console.log('Product not found, adding with default values');

            product = {
                _id: productId,
                name: 'Unknown Product',
                price: 0, // Or set a default price
                availableQuantity: 0, // No stock available
                images: [], // No images
                description: 'This product could not be found in the database'
            };
        }

        // Proceed to add to cart
        let cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            cart = new Cart({
                userId: userId,
                items: [{
                    productId,
                    name: product.name,
                    price: product.price,
                    quantity,
                    images: product.images,
                    description: product.description
                }]
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({
                    productId,
                    name: product.name,
                    price: product.price,
                    quantity,
                    images: product.images,
                    description: product.description
                });
            }
        }
        await cart.save();
        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
};

// Get Cart Function
const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        // Populate the cart items with product details from data
        const cartWithProducts = cart.items.map(item => {
            const product = data.find(prod => prod._id === item.productId);
            return {
                ...item.toObject(),
                product
            };
        });

        res.status(200).json({ cartItems: cartWithProducts });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
};

const increment = async () => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            return res.status(400).json({ status: false, message: 'cart not found' })
        }
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            const product = data.find(prod => prod._id === productId);

            if (cart.items[itemIndex].quantity >= product.availableQuantity) {
                return res.status(400).json({ message: 'Insufficient stock to increment further' });
            }

            cart.items[itemIndex].quantity += 1;
            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'something went wrong' });
    }
}

const decrement = async () => {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId: userId })
        if (!cart) {
            return res.status(400).json({ status: false, message: 'no product was found in your cart' });
        }
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity -= 1;
            // If the quantity reaches 0, remove the product from the cart
            if (cart.items[itemIndex].quantity <= 0) {
                cart.items.splice(itemIndex, 1); // Remove item from cart if quantity is 0 or less
            }
            await cart.save();
            res.status(200).json(cart);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'something went wrong' })
    }
}

const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        // Find the user's cart
        let cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the index of the product in the cart
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            // Remove the product from the cart regardless of quantity
            cart.items.splice(itemIndex, 1);
            await cart.save();
            res.status(200).json({ message: 'Product removed from cart', cart });
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
};


module.exports = { addToCart, getCart, increment, decrement, removeFromCart, checkout };
