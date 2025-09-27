import mongoose from "mongoose";

const inactiveUserSchema = new mongoose.Schema(
  {
    originalUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    firstName: String,
    lastName: String,
    name: String,
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["member", "admin"],
    },
    userImage: String,
    password: String,
    position: String,
    adminRole: String,
    permissions: [String],
    admin_id: String,
    image_path: String,
    score: Number,
    eventsParticipated: Number,
    newsletterParticipated: Number,
    leo_Id: String,
    address: String,
    birthday: Date,
    mobile: String,
    enrollmentNo: {
      type: String,
      trim: true,
    },
    reason: String,
    deactivatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deactivationDate: {
      type: Date,
      default: Date.now,
    },
    originalCreatedAt: Date,
  },
  {
    timestamps: true,
  }
);

const InactiveUser = mongoose.model("InactiveUser", inactiveUserSchema);
export default InactiveUser;