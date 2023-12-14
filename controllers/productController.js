const Product = require('../models/product');
const ProductTypes = require('../models/productTypes');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Private
exports.getProducts = async (req, res) => {
  try{
        const keyword = req.query.keyword ? {
          name: {
              $regex: req.query.keyword,
              $options: 'i' //case-insensitive
          }
        } : {}
  
        console.log("Brand from query:" + req.query.brand)
        console.log("Category from query: " + req.query.category)
  
        let products, count;
  
        if(!req.query.brand && !req.query.category){
          products = await Product.find({})
          count = await Product.countDocuments({})
        }else{
          let _brand = req.query.brand.charAt(0).toUpperCase() + req.query.brand.slice(1);
          let _category = req.query.category.charAt(0).toUpperCase() + req.query.category.slice(1);
          
          count = await Product.countDocuments({ "brand": req.query.brand, "category": req.query.category })
          products = await Product.find({"brand": req.query.brand.replace(/['"]+/g, ''),
                                        "category": req.query.category.replace(/['"]+/g, '')})
        }
  
        console.log("Count: " + count + " Products: " + products)
  
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200)
        res.json(products)
      }
      catch(err){
        res.status(500).send(err);
      }

};

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

    // @desc    Add new product type
    // @route   POST /api/add-new-product-type
    // @access  Public
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

    // @desc    Delete existing product
    // @route   POST /api/products/{:id}
    // @access  Public
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