const express = require ('express');
const router = express.Router();

const {getAllProducts, getProductByCategory, getProductByName, getProductByPrice, getProductByCategoryOrSection} = require ('../controller/product.controller');

router.get('/products', getAllProducts);
router.get('category/:category', getProductByCategory);
router.get('/name/:name', getProductByName); // Change this
router.get('/price/:price', getProductByPrice);
router.get('/category', getProductByCategory);
router.get('/name', getProductByName);
router.get('/price', getProductByPrice);
router.get('/category/:category', getProductByCategoryOrSection);
// router.get('/section/:section', getProductByCategoryOrSection);




module.exports = router;