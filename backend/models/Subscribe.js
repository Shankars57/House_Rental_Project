import mongoose from "mongoose";

const subSchema = new mongoose.Schema({
  email: { type: "string", required: true },
});

const subModel = new mongoose.model("Subscribed", subSchema);
export default subModel;
