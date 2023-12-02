const mongoose = require('mongoose');

// SupplierTypes Schema
const SupplierTypesSchema = new mongoose.Schema({
    type: { type: String, required: true },
  });

  const SupplierTypes = mongoose.model('SupplierTypes', SupplierTypesSchema);

  module.exports = SupplierTypes;