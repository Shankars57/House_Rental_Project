import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Tenant", "Landlord"], required: true },
    avatarUrl: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const userModel =
  mongoose.model.userSchema || mongoose.model("users", userSchema);

export default userModel;
