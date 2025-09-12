import mongoose from "mongoose";

const awardSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    winner: { type: String },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

const Award = mongoose.model("Award", awardSchema);
export default Award;
