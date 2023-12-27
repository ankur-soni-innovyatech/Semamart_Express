const express = require('express');
const router = express.Router();
const internalOrdersController = require('../controllers/internalOrdersController')

router.get('/allInternalOrders', internalOrdersController.getAllInternalOrders);
router.post('/add-internal-orders', internalOrdersController.addInternalOrder);

module.exports = router;