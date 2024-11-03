const express = require ('express');
const router = express.Router();

const {getAllProducts, getProductByCategory, getProductByName, getProductByPrice, getProductByCategoryOrSection, getProductById, returnProductById} = require ('../controller/product.controller');

router.get('/products', getAllProducts);
router.get('category/:category', getProductByCategory);
router.get('/name/:name', getProductByName);
router.get('/price/:price', getProductByPrice);
router.get('/category', getProductByCategory);
router.get('/name', getProductByName);
router.get('/product/:id', getProductById);
router.get('/price', getProductByPrice);
router.get('/category/:category', getProductByCategoryOrSection)

router.post('/return-product/:id', returnProductById);

module.exports = router;