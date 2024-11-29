import mongoose from "mongoose";

await mongoose.connect("mongodb+srv://scpepito:yTHW4UiE7G2%40gE.@cluster0.cscy5.mongodb.net/");

// create Product model with schema for product details
const Product = mongoose.model('Products',{
    productId: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productType: { type: Number, enum: [1, 2], required: true }, 
    productQuantity: { type: Number, required: true }
});

// add new product
export const addNewProduct = async (req, res) => {
    try {
        const { productId, productName, productDescription, productType, productQuantity } = req.body;
        if (!(productId && productName && productDescription && productType && productQuantity)) {
            return res.status(400).send({ inserted: false, message: "missing required fields" });
        }
        const product = new Product(req.body);
        await product.save(); // save product to DB
        res.status(201).send({ inserted: true, message: "product added successfully" });
    } catch (error) {
        res.status(500).send({ inserted: false, message: error.message }); // handle error
    }
};

// get product by productId
const getProductByID = async (req, res) => {
    const product = await Product.findOne({ productId: req.body.productId });
    res.send(product); // return product details
};

// update product details
const updateProductDetails = async (req, res) => {
    try {
        const product = await Product.findOne({ productId: req.body.productId });
        if (product == null) {
            return res.status(404).json({ message: 'product not found' });
        }
        
        // update fields if provided
        if (req.body.productName) product.productName = req.body.productName;
        if (req.body.productDescription) product.productDescription = req.body.productDescription;
        if (req.body.productType) product.productType = req.body.productType;
        if (req.body.productQuantity) product.productQuantity = req.body.productQuantity;
        
        res.json(await product.save()); // save updated product details
    } catch (err) {
        res.status(400).json({ message: err.message }); // handle error
    }
};

// delete product by productId
const deleteProduct = async (req, res) => {
    const productDeletetion = await Product.deleteOne({ productId: req.body.productId });
    res.send(productDeletetion); // send result of deletion
};

// show all products
const showAllProducts = async (req, res) => {
    res.send(await Product.find({})); // fetch all products from DB
};

export { getProductByID, updateProductDetails, deleteProduct, showAllProducts };