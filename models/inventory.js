const mongoose = require('mongoose');

// Product Schema
const InventorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    modelNo: { type: String, required: true },
    oem: { type: String, required: true },
    specification: { type: String},
    totalQuantity: { type: Number },
    totalConsumedQuantity: { type: Number, default: 0 },
    totalAvailableQuantity: { type: Number }
});

const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;