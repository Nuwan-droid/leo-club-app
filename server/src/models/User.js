import mongoose from 'mongoose';

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 1ca627577843a7ae33fdb2e8d324e1011c9fae89
const userSchema = new mongoose.Schema(
  {
    leoStatus: {
      type: String,
      enum: ["member", "not-member"],
      required: true,
<<<<<<< HEAD
    },
    memberId: {
      type: String,
      validate: {
        validator: function (value) {
          if (this.leoStatus === "member") {
            return value && value.trim().length > 0;
          }
          return true;
        },
        message: "Member ID is required for members.",
      },
    },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    address: { type: String, trim: true },
    birthday: { type: Date },

    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobile: { type: String, trim: true },

    password: {
      type: String,
      required: [true, "Password is required."],
    },

   
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvedAt: {
      type: Date,
    },

    
    score: {
      type: Number,
      default: 0,
    },
    eventsParticipated: {
      type: Number,
      default: 0,
    },
    volunteering: [
      {
        event: { type: String },
        date: { type: Date },
        hours: { type: Number },
      },
    ],
    newsletterSubscribed: {
      type: Number,
      default: 0,
    },
    profileImage: {
      type: String, 
    },

   
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);
=======
const userSchema = new mongoose.Schema({
  leoStatus: {
    type: String,
    enum: ['member', 'not-member'],
    required: false,
  },
  userId: {
    type: String,
    validate: {
      validator: function (value) {
        if (this.leoStatus === 'member') {
          return value && value.trim().length > 0;
        }
        return true;
      },
      message: 'user ID is required for all users.',
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
  userImage: {
    type: String, // Path or URL to the user's profile image
    trim: true,
    default: 'https://randomuser.me/api/portraits',
  },
  role: {
    type: String,
    enum: ['member', 'admin'],
    required: true,
    default: 'member',
  },
}, { timestamps: true });
>>>>>>> origin/Dev

=======
    },
    memberId: {
      type: String,
      validate: {
        validator: function (value) {
          if (this.leoStatus === "member") {
            return value && value.trim().length > 0;
          }
          return true;
        },
        message: "Member ID is required for members.",
      },
    },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    address: { type: String, trim: true },
    birthday: { type: Date },

    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobile: { type: String, trim: true },

    password: {
      type: String,
      required: [true, "Password is required."],
    },

   
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvedAt: {
      type: Date,
    },

    
    score: {
      type: Number,
      default: 0,
    },
    eventsParticipated: {
      type: Number,
      default: 0,
    },
    volunteering: [
      {
        event: { type: String },
        date: { type: Date },
        hours: { type: Number },
      },
    ],
    newsletterSubscribed: {
      type: Number,
      default: 0,
    },
    profileImage: {
      type: String, 
    }
  },
  { timestamps: true }
);

>>>>>>> 1ca627577843a7ae33fdb2e8d324e1011c9fae89
export default mongoose.model('User', userSchema);
