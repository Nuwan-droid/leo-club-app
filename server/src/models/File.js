import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    filename: String,
    path: String,
    mimetype: String,
    size: Number,

    // Newsletter fields
    month: { type: String, required: true },
    year: { type: Number, required: true },
    imageSrc: { type: String, required: true }, // preview image
    viewUrl: { type: String, required: true },  // heyzine link
  },
  { timestamps: true }
);

export default mongoose.model("File", fileSchema);
