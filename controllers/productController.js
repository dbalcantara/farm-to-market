import Product from '../mongoose/Product.js';

// Create a product (Admin only)
const createProduct = async (req, res) => {
  const { name, description, type, price, quantity } = req.body;

  const newProduct = new Product({ name, description, type, price, quantity });
  
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Get all products
const getProduct = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Update product quantity (Admin only)
const updateProduct  = async (req, res) => {
  const { quantity } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

export { createProduct,  getProduct, updateProduct};


