import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  order_id: { type: String, required: true, unique: true },
  user_email: { type: String, required: true },
  amount: { type: String, required: true },
  currency: { type: String, required: true },
  status: { type: String, required: true }, // SUCCESS or FAILED
  paidAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', PaymentSchema);
