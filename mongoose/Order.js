import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  orderQuantity: { type: Number, min: 1 },
  orderStatus: { type: Number, enum: [0, 1, 2] },  // 0 Pending, 1 Completed, 2 Canceled
  email: { type: String, required: true },
  dateOrdered: { type: Date, default: Date.now },
  time: { type: String, default: () => new Date().toLocaleTimeString() }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
