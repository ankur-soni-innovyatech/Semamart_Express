const mongoose = require('mongoose');

// Product Schema
const Supplierschema = new mongoose.Schema({
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    type: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    contactNumber: { type: String, required: true },
  });

  const Supplier = mongoose.model('Product', ProductSchema);

  module.exports = Supplier;