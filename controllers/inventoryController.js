const Inventory = require("../models/inventory");

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find({});

    if (!inventory || !inventory.length) {
      return res.status(404).send({ message: "No inventory found" });
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(inventory);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.addInventory = async (req, res) => {
  try {
    const newInventory = new Inventory({
      name: req.body.name || "",
      batchNumber: req.body.batchNumber || "",
      oem: req.body.oem || "",
      hsnCode: req.body.hsnCode || "",
      equipmentType: req.body.equipmentType || "",
      totalQuantity: req.body.totalQuantity || "",
      totalConsumedQuantity: 0
      /*
      totalConsumedQuantity: req.body.totalConsumedQuantity || "",
       totalSoldQuantity: req.body.totalSoldQuantity || "",
      totalAvailableQuantity:
        req.body.totalQuantity - req.body.totalSoldQuantity, */
    });

    const savedInventory = await newInventory.save();
    res.status(200).send(savedInventory);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const inventoryId = req.params.id; // assuming you're sending id as a URL parameter

    // find the product by id and delete it
    const deletedInventory = await Inventory.findByIdAndDelete(inventoryId);

    if (!deletedInventory) {
      return res
        .status(404)
        .send({ message: "No inventory found with this id" });
    }

    res
      .status(200)
      .send({
        message: "Inventory deleted successfully",
        product: deletedInventory,
        name: req.body.name || "",
        batchNumber: req.body.batchNumber || "",
        oem: req.body.oem || "",
        hsnCode: req.body.hsnCode || "", 
        totalQuantity: req.body.totalQuantity || "",
        totalConsumedQuantity: req.body.totalConsumedQuantity
        /* specification: req.body.specification || "",
        totalSoldQuantity: req.body.totalSoldQuantity || "",
        totalAvailableQuantity: req.body.totalQuantity - req.body.totalSoldQuantity */
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    const consumedQuantity = req.body.consumedQuantity;

    // find the inventory item by id and update
    const inventory = await Inventory.findById(inventoryId);
    if (!inventory){
      return res
        .status(404)
        .send({ message: "No inventory found with this id" });
    }
    if ((inventory.totalQuantity - inventory.totalConsumedQuantity) >= consumedQuantity){
      const updatedInventory = await Inventory.findOneAndUpdate(
        { _id: inventoryId }, 
        { $inc: { totalConsumedQuantity: consumedQuantity } },
        { new: true } // this option returns the updated document
      );
      res
      .status(200)
      .send({
        message: "Inventory updated successfully",
        product: updatedInventory
      });
    } else {
      res
      .status(400)
      .send({
        message: "Not enough quantity in inventory for this operation",
      });
    }
    
  } catch (err) {
    res.status(500).send(err);
  }
};