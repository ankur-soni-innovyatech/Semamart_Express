const PurchaseOrder = require('../models/purchaseOrder');

exports.getPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.find();

    if (!purchaseOrders || !purchaseOrders.length ) {
      return res.status(404).send({ message: 'No Purchase Order found' });
    }
    res.status(200).send(purchaseOrders);
  } 
  catch (err) {
    res.status(500).send(err);
  }};

exports.addPurchaseOrder = async (req, res) => {
  try {
  const newPurchaseOrder = new PurchaseOrder({
      quantity: req.body.quantity || "",
      itemName: req.body.itemName || "",
      unitRatePerPiece: req.body.unitRatePerPiece,
      uom: req.body.uom,
      basicValue: req.body.basicValue,
      gst: req.body.gst
    });
  
      const savedPurchaseOrder = await newPurchaseOrder.save();
      res.status(200).send(savedPurchaseOrder);
    } 
    catch (err) {
      res.status(500).send(err);
    }};