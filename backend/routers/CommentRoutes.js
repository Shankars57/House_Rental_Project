import express from "express";

import { getComments, postComment } from "../controllers/CommentController.js";
import { verifyAuth } from "../middleware/auth.js";

const commentRouter = express.Router();

commentRouter.post("/:id", postComment);
commentRouter.get("/get-comments/:id", getComments);

export default commentRouter;
