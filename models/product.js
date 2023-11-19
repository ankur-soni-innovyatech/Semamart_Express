const mongoose = require('mongoose');

// Product Schema
const ProductSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    modelNumber: { type: String, required: true },
    oem: { type: String, required: true },
    hsnCode: { type: String, required: true },
    salesRate: { type: Number, required: true },
    gst: { type: Number, required: true },
    unitRateIncGST: { type: Number, required: true },
    unitRateExcGST: { type: Number, required: true },
    discountStartDate: { type: Date },
    discountEndDate: { type: Date },
    discountType: { type: String, enum: ['Percentage', 'Flat'] },
    discountValue: { type: Number },
    discountStatus: { type: String, enum: ['Active', 'Inactive'] }
  });

  const Product = mongoose.model('Product', ProductSchema);

  module.exports = Product;