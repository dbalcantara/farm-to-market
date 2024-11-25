import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true, match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ },
  password: { type: String, required: true },
  userType: { type: String, enum: ['customer', 'merchant'], default: 'customer' }
});

const User = mongoose.model('User', userSchema);
export default User;
