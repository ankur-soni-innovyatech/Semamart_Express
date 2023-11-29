const Inventory = require('../models/inventory');

exports.getInventory = async (req, res) => {
  try {

    const inventory = await Inventory.find();

    if (!inventory || !inventory.length ) {
      return res.status(404).send({ message: 'No inventory found' });
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(inventory);
  } 
  catch (err) {
    res.status(500).send(err);
  }};

  exports.addInventory = async (req, res) => {
    try {
    const newInventory = new Inventory({
        name: req.body.name || "",
        modelNo: req.body.modelNo || "",
        oem: req.body.oem || "",
        specification: req.body.specification || "",
        totalQuantity: req.body.totalQuantity || "",
        totalSoldQuantity: req.body.totalSoldQuantity || "",
        totalAvailableQuantity: req.body.totalQuantity - req.body.totalSoldQuantity
      });
    
        const savedInventory = await newInventory.save();
        res.status(200).send(savedInventory);
      } 
      catch (err) {
        res.status(500).send(err);
      }};