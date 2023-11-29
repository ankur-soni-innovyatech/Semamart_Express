const Product = require('../models/product');

exports.getProducts = async (req, res) => {
  try {
  const { brand, category, hsnCode } = req.query;

    /* const products = await Product.find({
      brand: brand,
      category: category,
      hsnCode: hsnCode
    });

    if (!products || !products.length ) {
      return res.status(404).send({ message: 'No products found' });
    }
    res.status(200).send(products); */

    const products = await Product.find({})
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200)
    res.json(products)
  } 
  catch (err) {
    res.status(500).send(err);
  }};

exports.addProduct = async (req, res) => {
  try {
  const newProduct = new Product({
      brand: req.body.brand || "",
      category: req.body.category || "",
      name: req.body.name || "",
      modelNumber: req.body.modelNumber || "",
      oem: req.body.oem || "",
      hsnCode: req.body.hsnCode || "",
      salesRate: req.body.salesRate || "",
      gst: req.body.gst || "",
      unitRateIncGST: req.body.unitRateIncGST || "",
      unitRateExcGST: req.body.unitRateExcGST || "",
      discountStartDate: req.body.discountStartDate,
      discountEndDate: req.body.discountEndDate,
      discountType: req.body.discountType || "",
      discountValue: req.body.discountValue,
      discountStatus: req.body.discountStatus || ""
    });
  
      const savedProduct = await newProduct.save();
      res.status(200).send(savedProduct);
    } 
    catch (err) {
      res.status(500).send(err);
    }};