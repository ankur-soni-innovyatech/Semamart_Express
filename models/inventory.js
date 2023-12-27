const mongoose = require('mongoose');

// Inventory Schema
const InventorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    batchNumber: { type: String, required: true },
    oem: { type: String, required: true },
    hsnCode: {type: String, required: true},
    totalQuantity: { type: Number, required: true },
    totalConsumedQuantity: { type: Number, required: true },
    equipmentType: { type: String, required: true}, //Emergency , Critical, Non-Critical
    /* totalConsumedQuantity: { type: Number, default: 0, required: false },
    totalAvailableQuantity: { type: Number, required: false } */
});

const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;