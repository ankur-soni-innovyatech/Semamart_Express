const SupplierTypes = require('../models/supplierTypes');
const Supplier = require('../models/suppliers');

// @desc    Fetch all suppliers
// @route   GET /api/suppliers
// @access  Public
exports.getSuppliers = async(req,res) => {
    try{
        const allSuppliers = await Supplier.find({});
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200)
        res.json(allSuppliers)
    }catch(error){
        res.status(500).send(error);
    }
}

exports.addSuppliers = async(req, res) => {
    try{
        const newSupplier = new Supplier({
            name: req.body.name,
            companyName: req.body.companyName,
            type: req.body.type,
            email: req.body.email,
            city: req.body.city,
            state: req.body.state,
            contactNumber: req.body.contactNumber,
            gstNumber: req.body.gstNumber,
            productType: req.body.productType
        })

        const saveSupplier = await newSupplier.save();
        console.log(saveSupplier);
        res.status(200).send(saveSupplier);
    }
    catch (err) {
        res.status(500).send(err);
    };
}

exports.getAllSupplierTypes = async(req,res) => {
    try{
        const allSupplierTypes = await SupplierTypes.find({})
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200);
        res.json(allSupplierTypes)
    }
    catch (err) {
        res.status(500).send(err);
    };
}