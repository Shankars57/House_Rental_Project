import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  return await mongoose.connect(process.env.MONGODB ).then(()=>console.log('DB connected successfully')).catch((e)=>console.log(e.message));
};


export default connectDB;