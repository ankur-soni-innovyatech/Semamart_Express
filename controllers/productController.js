const Product = require('../models/product');
const ProductTypes = require('../models/productTypes');

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
        productName: req.body.productName || "",
        batchNumber: req.body.batchNumber || "",
        oem: req.body.oem || "",
        hsnCode: req.body.hsnCode || "",
        unitRate: req.body.unitRate || "",
        manufacturer: req.body.manufacturer || "",
        gst: req.body.gst || ""
        /* unitRateIncGST: req.body.unitRateIncGST || "",
        unitRateExcGST: req.body.unitRateExcGST || "",
        discountStartDate: req.body.discountStartDate,
        discountEndDate: req.body.discountEndDate,
        discountType: req.body.discountType || "",
        discountValue: req.body.discountValue,
        discountStatus: req.body.discountStatus || "" */
      });
  
      const savedProduct = await newProduct.save();
      res.header("Access-Control-Allow-Origin", "*");
      res.status(200).send(savedProduct);
    } 
    catch (err) {
      console.log("ERROR: " + err)
      res.status(500).send(err);
    }};

    exports.getProductTypes = async(req, res) => {
      try{
        const productTypes = await ProductTypes.find({})
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200)
        res.json(productTypes)
      }catch(err){
        res.status(500).send(err);
      }
    }

    exports.addNewProductType = async(req,res) => {
      try{
        const newProductType = new ProductTypes({
          type: req.body.productType || ""
        })

        const savedProductType = await newProductType.save();
        res.status(200).send(savedProductType)
      }catch(err){
        res.status(500).send(err);
      }
    }

    exports.deleteProduct = async (req, res) => {
      try {
        const productId = req.params.id; // assuming you're sending id as a URL parameter
    
        // find the product by id and delete it
        const deletedProduct = await Product.findByIdAndDelete(productId);
    
        if (!deletedProduct) {
          return res.status(404).send({ message: 'No product found with this id' });
        }
    
        res.status(200).send({ message: 'Product deleted successfully', product: deletedProduct });
      } 
      catch (err) {
        res.status(500).send(err);
      }
    };