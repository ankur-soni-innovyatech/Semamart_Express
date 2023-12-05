const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/order', orderController.getOrder);
router.post('/order', orderController.addOrder);

module.exports = router;