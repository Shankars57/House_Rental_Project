import adminModel from "../models/Admin.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_ID) {
      return res.json({ success: false, message: "Email is not matched" });
    }
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Password is incorrect" });
    }

    const token = generateToken(email);

    res.json({ success: true, message: "Login Successfully", token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
