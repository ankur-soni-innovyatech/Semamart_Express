const mongoose = require('mongoose');

// ProductTypes Schema
const ProductTypesSchema = new mongoose.Schema({
    type: { type: String, required: true },
  });

  const ProductTypes = mongoose.model('ProductTypes', ProductTypesSchema);

  module.exports = ProductTypes;