import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  hasPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, expires: "24h" } 
  // auto delete after 24h if unpaid
});

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;
