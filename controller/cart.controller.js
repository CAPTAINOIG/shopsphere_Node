const express = require('express');
const Cart = require('../model/cart.model');
const Product = require('../model/product.model');
const data = require('../Data/categories'); 

const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let product = data.find(prod => prod._id === productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.availableQuantity < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
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
                    description:product.description 
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
                    description:product.description 
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

const increment = async () =>{
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId: userId });
        if(!cart){
            return res.status(400).json({status:false, message: 'cart not found'})
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
        res.status(500).json({status: false, message: 'something went wrong'});
    }
}

const decrement = async ()=>{
    const {userId, productId} = req.body;

    try {
        const cart = await Cart.findOne({userId:userId})
        if(!cart){
            return res.status(400).json({status:false, message: 'no product was found in your cart'});
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
        res.status(500).json({status: false, message: 'something went wrong'})
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


module.exports = { addToCart, getCart, increment, decrement, removeFromCart };
