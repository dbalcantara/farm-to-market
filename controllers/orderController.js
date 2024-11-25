import Order from '../mongoose/Order.js';
import Product from '../mongoose/Product.js';

const createOrder =  async (req, res) => {
  const { productId, orderQuantity, email } = req.body;

  const product = await Product.findById(productId);
  if (!product || product.quantity < orderQuantity) {
    return res.status(400).json({ message: 'Insufficient stock' });
  }

  const newOrder = new Order({
    productId,
    orderQuantity,
    email,
    orderStatus: 0, // Pending
  });

  try {
    const savedOrder = await newOrder.save();
    // Update product quantity
    product.quantity -= orderQuantity;
    await product.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Get orders by user email (Customer)
const getOrders = async (req, res) => {
  const orders = await Order.find({ email: req.params.email });
  res.json(orders);
};

export { createOrder, getOrders };

