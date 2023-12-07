const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getProducts);
router.post('/add-product', productController.addProduct);

router.get('/product-types', productController.getProductTypes);
router.post('/add-new-product-type', productController.addNewProductType);

module.exports = router;