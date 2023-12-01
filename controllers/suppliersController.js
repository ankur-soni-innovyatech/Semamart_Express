const Supplier = require('../models/suppliers');
const Suppliers = require('../models/suppliers');

exports.getSuppliers = async(req,res) => {
    try{
        const allSuppliers = await Suppliers.find({});
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
        res.status(200).send(saveSupplier);
    }
    catch (err) {
        res.status(500).send(err);
    };
}