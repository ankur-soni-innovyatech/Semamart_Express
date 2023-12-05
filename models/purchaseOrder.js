const mongoose = require('mongoose');

// Product Schema
const Purchaseorderschema = new mongoose.Schema({
    quantity: { type: Number, required: true },
    itemName: { type: String, required: true },
    unitRatePerPiece: { type: Number, required: true },
    uom: { type: String, required: true, enum: ['NOS'] },
    basicValue: { type: Number, required: true },
    gst: { type: Number, required: true }
  });

  const PurchaseOrder = mongoose.model('PurchaseOrder', Purchaseorderschema);

  module.exports = PurchaseOrder;