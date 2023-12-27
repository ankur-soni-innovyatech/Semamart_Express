const mongoose = require('mongoose');

// Internal Orders Schema
const InternalOrdersSchema = new mongoose.Schema({
    requestedProductName: { type: String, required: true },
    requestedProductQuantity: {type: String, required: true},
    batchNumber: { type: String, required: false },
    requestingDepartmentName: {type: String, required: true},
    dateRequested: {type: Date, required: true},
    dateFulfilled: {type: Date, required: true},
    fulfillmentStatus: {type: String, required: true},
  });

  const InternalOrders = mongoose.model('InternalOrders', InternalOrdersSchema);

  module.exports = InternalOrders;