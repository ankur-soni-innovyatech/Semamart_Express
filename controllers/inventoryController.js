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
