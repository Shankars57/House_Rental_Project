import express from "express";
import {
  createListing,
  deletePostListing,
  getAllListings,
  getListings,
} from "../controllers/PostListing.js";
import { upload } from "../middleware/Multer.js";
import { verifyAuth } from "../middleware/auth.js";

const ListingRouter = express.Router();

ListingRouter.post("/post", upload.array("images", 10), createListing);
ListingRouter.get("/get", verifyAuth, getAllListings);
ListingRouter.delete("/delete/:id", deletePostListing);
ListingRouter.get("/all-listings", getListings);
ListingRouter.get("/get-property", getListings);

export default ListingRouter;
