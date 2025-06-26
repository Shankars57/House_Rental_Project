import mongoose, { mongo } from "mongoose";

const listingSchema = new mongoose.Schema({
  owner: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  images: {
    type: [String], 
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  propertyType: { type: String, enum: ["Apartment", "House"], required: true },
  bedrooms: { type: String, required: true },
  bathrooms: { type: String, required: true },
  isAvailable:{
    type:String,
    enum:["available","notAvailable"],
    default:"available",
    required:true,
  },
  furnish: {
    type: String,
    enum: ["furnished", "semi-furnished", "unfurnished"],
    required: true,
  },
  age: { type: Number, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: Number, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  priceType: { type: String, enum: ["rent", "price"], required: true },
  price: { type: String, required: true },
  content: { type: String }, 

},{timestamps:true});

const ListingModel = mongoose.model("Listings", listingSchema);

export default ListingModel;
