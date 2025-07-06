import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  leoStatus: {
    type: String,
    enum: ['member', 'not-member'],
    required: true,
  },
  memberId: {
    type: String,
    validate: {
      validator: function (value) {
        if (this.leoStatus === 'member') {
          return value && value.trim().length > 0;
        }
        return true;
      },
      message: 'Member ID is required for members.',
    },
  },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  address: { type: String, trim: true },
  birthday: { type: Date },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  mobile: { type: String, trim: true },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
