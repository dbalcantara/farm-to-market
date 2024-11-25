import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: Number, enum: [1, 2] }, // 1 for crops, 2 for poultry
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, min: 0 }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
