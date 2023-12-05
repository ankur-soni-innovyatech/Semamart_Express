const express = require('express');
const router = express.Router();
const suppliersController = require('../controllers/suppliersController');

router.get('/suppliers', suppliersController.getSuppliers);
router.post('/add-supplier', suppliersController.addSuppliers);

router.get('/supplier-types', suppliersController.getAllSupplierTypes);
router.post('/add-new-supplier-type', suppliersController.addNewSupplierType);

module.exports = router;