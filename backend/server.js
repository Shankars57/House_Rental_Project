import express from "express";
import cors from "cors";
import connectDB from "./config/DB.js";
import UserRouter from "./routers/userRoutes.js";
import ListingRouter from "./routers/ListingRoutes.js";
import adminRouter from "./routers/AdminRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import commentRouter from "./routers/CommentRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB Connect
connectDB();

// Routes
app.use("/api/users", UserRouter);
app.use("/api/listing", ListingRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/admin", adminRouter);
app.use("/api/comments", commentRouter);

// Default test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Server start
app.listen(4000, () => {
  console.log("Server runs on port: 4000");
});
