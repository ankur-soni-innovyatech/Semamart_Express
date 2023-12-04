const Supplier = require('../models/suppliers');

exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    if (!suppliers || !suppliers.length ) {
      return res.status(404).send({ message: 'No suppliers found' });
    }
    res.status(200).send(suppliers);
    } 
  catch (err) {
    res.status(500).send(err);
    }};

exports.addSuppliers = async (req, res) => {
  try {
  const newSupplier = new Supplier({
      name: req.body.name || "",
      companyName: req.body.companyName || "",
      type: req.body.type || "",
      email: req.body.email || "",
      city: req.body.city || "",
      state: req.body.state || "",
      contactNumber: req.body.contactNumber || ""
    });
  
      const savedSupplier = await newSupplier.save();
      res.status(200).send(savedSupplier);
    } 
    catch (err) {
      res.status(500).send(err);
    }};