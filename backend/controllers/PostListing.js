import ListingModel from "../models/PostModel.js";
import imageKit from "../imageKit/imageKit.js";
const createListing = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      title,
      description,
      propertyType,
      bedrooms,
      bathrooms,
      furnish,
      isAvailable,
      age,
      address,
      city,
      pinCode,
      state,
      country,
      priceType,
      price,
      content,
    } = req.body;

    const images = req.files.map((file) => file.filename);

    const newListing = new ListingModel({
      owner: {
        firstName,
        lastName,
        phone,
        email,
      },
      images,
      title,
      description,
      propertyType,
      bedrooms,
      isAvailable,
      bathrooms,
      furnish,
      age,
      location: {
        address,
        city,
        pinCode,
        state,
        country,
      },
      priceType,
      price,
      content,
    });

    await newListing.save();
    res.status(201).json({ success: true, listing: newListing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getAllListings = async (req, res) => {
  try {
    const { role, email } = req.user;

    const query = role === "Landlord" ? {} : { "owner.email": email };

    const listings = await ListingModel.find(query).sort({ createdAt: -1 });

    res.status(200).json({ success: true, listings, role });
  } catch (err) {
    console.error("Error in getAllListings:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch listings" });
  }
};

export const getListings = async (req, res) => {
  try {
    const properties = await ListingModel.find();

    res.json({ success: true, properties });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getProperty = async (req, res) => {
  try {
    const { id } = await req.body;
    const property = await ListingModel.find({ id: id });
    res.json({ success: true, property });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const deletePostListing = async (req, res) => {
  try {
    const { id } = await req.params;

    const deleteItem = await ListingModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Successfully Deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { createListing, getAllListings, deletePostListing };
