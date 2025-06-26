import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    name: { type: String },
    comment: { type: String },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listings",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("Comments", commentSchema);

export default commentModel;
