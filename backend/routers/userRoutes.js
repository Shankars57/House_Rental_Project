import express from "express";
import {
  deleteUser,
  editUser,
  getAllUsers,
  getUser,
  login,
  register,
} from "../controllers/userController.js";
import { verifyAuth } from "../middleware/auth.js";
import { upload } from "../middleware/ProfileMulter.js";

const UserRouter = express.Router();

UserRouter.post("/register", upload.single("image") , register);
UserRouter.post("/login", login);
UserRouter.post("/edit/:id", verifyAuth, editUser);
UserRouter.delete("/delete/:id", verifyAuth, deleteUser);
UserRouter.get("/get-user", verifyAuth, getUser);
UserRouter.get("/all-users",getAllUsers )

export default UserRouter;
