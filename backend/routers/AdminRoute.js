import express from 'express';

import { loginAdmin } from '../controllers/AdminController.js';

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);

export default adminRouter;