const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchaseOrderController');

router.get('/purchaseorder', purchaseOrderController.getPurchaseOrder);
router.post('/purchaseorder', purchaseOrderController.addPurchaseOrder);

module.exports = router;