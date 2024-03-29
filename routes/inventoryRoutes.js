const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/inventory', inventoryController.getInventory);
router.delete('/delete-inventory/:id', inventoryController.deleteInventory);
router.post('/add-inventory', inventoryController.addInventory);

module.exports = router;