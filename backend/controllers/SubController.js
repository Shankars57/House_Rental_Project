import subModel from "../models/Subscribe.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const subEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        success: false,
        message: "Please enter your email.",
      });
    }

    const alreadySubscribed = await subModel.findOne({ email });
    if (alreadySubscribed) {
      return res.json({
        success: false,
        message: "This email is already subscribed.",
      });
    }

    const newSubscription = new subModel({ email });
    await newSubscription.save();

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    return res.json({
      success: true,
      token,
      message: "Subscribed successfully!",
    });
  } catch (error) {
    console.error("Subscription Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during subscription.",
    });
  }
};
