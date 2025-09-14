const express = require ('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');


const {addToCart, getCart, checkout} = require ('../controller/cart.controller')

router.post('/add-to-cart', verifyToken, addToCart);
router.post('/checkout', checkout)
router.get('/cart/:userId', getCart);

module.exports = router