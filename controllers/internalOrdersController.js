const InternalOrders = require("../models/internalOrders");

// @desc    Fetch all internal orders
// @route   GET /api/internal-orders
// @access  Private
exports.getAllInternalOrders = async(req,res) => {
    try {
        const allInternalOrders = await InternalOrders.find({});
    
        if (!allInternalOrders || !allInternalOrders.length) {
          return res.status(404).send({ message: "No internal orders found" });
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).send(allInternalOrders);
      } catch (err) {
        res.status(500).send(err);
      }
}

// @desc    Fetch all internal orders
// @route   POST /api/add-internal-orders
// @access  Private
exports.addInternalOrder = async(req,res) => {
    try{
        const newInternalOrder = new InternalOrders({
            requestedProductName: req.body.requestedProductName,
            requestedProductQuantity: req.body.requestedProductQuantity,
            batchNumber: req.body.batchNumber,
            requestingDepartmentName: req.body.requestingDepartmentName,
            dateRequested: req.body.dateRequested,
            dateFulfilled: req.body.dateFulfilled,
            fulfillmentStatus: req.body.fulfillmentStatus,
        })

        const savedInternalOrder = await newInternalOrder.save();
        res.status(200).send(savedInternalOrder)
    } 
    catch (err) {
        res.status(500).send(err);
    }
}