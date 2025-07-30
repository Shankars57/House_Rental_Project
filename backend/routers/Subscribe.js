import express from "express";
import { subEmail } from "../controllers/SubController.js";

const subRouter = express.Router();

subRouter.post("/post", subEmail);

export default subRouter;
