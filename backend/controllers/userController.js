import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2d" }
  );
};

export const register = async (req, res) => {
  try {
    const { email, name, password, location, phone, role, avatarUrl } =
      req.body;

  const image = req.file?.filename;

    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already Existed" });
    }
    if (!email || !password || !phone || !location || !name) {
      return res.json({ success: false, message: "Fields are must be filled" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password is must contain 8 characters",
      });
    }

    const salt = 10;

    const hashPassword = await bcrypt.hash(password.toString(), salt);
    let splits = name.split(" ")[1] + name.split(" ")[1];

    const user = new userModel({
      email,
      phone,
      location,
      name,
      role,
      image,
      password: hashPassword,
      avatarUrl: `https://ui-avatars.com/api/?name=${splits}&background=06b6d4&color=fff&rounded=true`,
    });
    await user.save();
    const token = generateToken(user);
    res.json({
      success: true,
      message: "User successfully Registered",
      token,
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, role, password } = req.body;

    if (!email || !role || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    if (user.role !== role) {
      return res.json({ success: false, message: "Role mismatch" });
    }

    const isMatch = await bcrypt.compare(password.toString(), user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    const token = generateToken(user);
    res.json({
      success: true,
      message: "Logged In successfully",
      token,
      user,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const userID = req.user.id;
    const { name, phone, location } = req.body;
    const updateUser = await userModel.findByIdAndUpdate(
      userID,
      {
        $set: { name, phone, location },
      },
      { new: true, runValidators: true }
    );
    if (!updateUser) {
      return res.json({ success: false, message: "User not found" });
    }

    const { password, ...userData } = updateUser._doc;

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: userData,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const userID = req.params.id;
  try {
    const deleteUser = await userModel.findByIdAndDelete(userID);
    res.json({ success: true, message: "User Account Deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const userEmail = req.user.email;

    if (!userEmail) {
      return res.json({ success: false, message: "Email is missing" });
    }

    const user = await userModel
      .findOne({ email: userEmail })
      .select("-password");

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
        role: user.role,
      });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json({ success: true, users });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
