const mongoose = require('mongoose');

// Supplier Schema
const SupplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    supplierType: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    contactNumber: { type: String, required: true },
    gstNumber: {type: String, required: true},
    productType: {type: String, required: true}
  });

  const Supplier = mongoose.model('Supplier', SupplierSchema);

  module.exports = Supplier;