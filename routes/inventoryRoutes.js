const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/inventory', inventoryController.getInventory);
router.post('/inventory', inventoryController.addInventory);
router.delete('/delete-inventory/:id', inventoryController.deleteInventory);

module.exports = router;