const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsletterSubmissionSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Submission title is required"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Submission description is required"],
    },
    images: [{
      type: String,
      trim: true,
    }],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    newsletterParticipated: {
      type: Number,
      default: 1,
      validate: {
        validator: function (value) {
          return Number.isInteger(value) && value >= 1;
        },
        message: "Newsletter participated count must be a positive integer",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to update user's newsletterParticipated count
newsletterSubmissionSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const User = mongoose.model("User");
      await User.findByIdAndUpdate(
        this.user,
        { $inc: { newsletterParticipated: 1 } },
        { new: true }
      );
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Pre-remove hook to decrement user's newsletterParticipated count
newsletterSubmissionSchema.pre("remove", async function (next) {
  try {
    const User = mongoose.model("User");
    await User.findByIdAndUpdate(
      this.user,
      { $inc: { newsletterParticipated: -1 } },
      { new: true }
    );
  } catch (error) {
    return next(error);
  }
  next();
});

module.exports = mongoose.model("NewsletterSubmission", newsletterSubmissionSchema);