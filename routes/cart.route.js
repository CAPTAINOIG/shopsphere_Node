const express = require ('express');
const router = express.Router();

const {addToCart, getCart} = require ('../controller/cart.controller')

router.post('/cart/add', addToCart)
router.get('/cart/:userId', getCart);

module.exports = router