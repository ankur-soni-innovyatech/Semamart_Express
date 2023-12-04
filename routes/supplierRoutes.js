const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

router.get('/supplier', supplierController.getSuppliers);
router.post('/supplier', supplierController.addSuppliers);

module.exports = router;