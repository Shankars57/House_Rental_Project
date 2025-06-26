import React, { useState, useRef ,useContext} from "react";
import { assets } from "../../assets/assets";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { HouseContextProvider } from "../../context/HouseContext";

const PostListing = () => {
  const navigate = useNavigate();
  const {axiosInstance} = useContext(HouseContextProvider)
  const [owner, setOwner] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    furnish: "",
    isAvailable: "",
    age: "",
  });
  const [locationData, setLocationData] = useState({
    address: "",
    city: "",
    pinCode: "",
    state: "",
    country: "",
  });
  const [prices, setPrices] = useState({ priceType: "", price: "" });
  const [image, setImage] = useState([]);
  const fileInputRef = useRef(null);

  const handleMultipleImages = (e) => {
    const files = e.target.files[0];
    if (files) setImage((prev) => [...prev, files]);
    e.target.value = null;
  };

  const handleOwnerData = (e) =>
    setOwner({ ...owner, [e.target.name]: e.target.value });
  const handlePropertyData = (e) =>
    setPropertyData({ ...propertyData, [e.target.name]: e.target.value });
  const handleLocationData = (e) =>
    setLocationData({ ...locationData, [e.target.name]: e.target.value });
  const handlePriceData = (e) =>
    setPrices({ ...prices, [e.target.name]: e.target.value });

  const imageDelete = (id) => {
    setImage((prev) => prev.filter((_, idx) => idx !== id));
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Token not found");
    const formData = new FormData();

    Object.entries({
      ...owner,
      ...propertyData,
      ...locationData,
      ...prices,
    }).forEach(([key, val]) => {
      formData.append(key, val);
    });

    image.forEach((img) => formData.append("images", img));

    try {
      const { data } = await axiosInstance.post(
        "/listing/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success("Listing Added successfully");
        navigate("/#listings");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-8">
        <h2 className="text-3xl font-bold text-blue-800">Owner Details</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="firstName"
            value={owner.firstName}
            onChange={handleOwnerData}
            placeholder="First Name"
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="lastName"
            value={owner.lastName}
            onChange={handleOwnerData}
            placeholder="Last Name"
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="phone"
            value={owner.phone}
            onChange={handleOwnerData}
            placeholder="Phone"
            className="border border-gray-300 p-3 rounded-md w-full sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            value={owner.email}
            onChange={handleOwnerData}
            placeholder="Email"
            className="border border-gray-300 p-3 rounded-md w-full sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <h2 className="text-3xl font-bold text-blue-800">Property Details</h2>
        <div className="flex flex-col items-center">
          <label className="text-lg font-semibold mb-2">Upload Images</label>
          <div className="w-40 h-40 relative">
            <img
              src={assets.upload}
              alt="Upload Preview"
              className="w-full h-full object-cover rounded border"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleMultipleImages}
              ref={fileInputRef}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {image.map((img, idx) => (
              <div key={idx} className="relative w-16 h-16">
                <img
                  src={URL.createObjectURL(img)}
                  className="w-full h-full object-cover rounded shadow"
                  alt={`Preview ${idx}`}
                />
                <FaTrash
                  onClick={() => imageDelete(idx)}
                  className="absolute -top-2 -right-2 text-red-600 bg-white rounded-full p-1 cursor-pointer shadow hover:text-red-800"
                />
              </div>
            ))}
          </div>
          {image.length === 0 && (
            <p className="text-sm text-red-600 mt-2">* Please select images</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={propertyData.title}
            onChange={handlePropertyData}
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age of Property"
            value={propertyData.age}
            onChange={handlePropertyData}
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="bedrooms"
            placeholder="Bedrooms"
            value={propertyData.bedrooms}
            onChange={handlePropertyData}
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="bathrooms"
            placeholder="Bathrooms"
            value={propertyData.bathrooms}
            onChange={handlePropertyData}
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <textarea
          name="description"
          placeholder="Description..."
          className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={propertyData.description}
          onChange={handlePropertyData}
          required
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <select
            name="propertyType"
            value={propertyData.propertyType}
            onChange={handlePropertyData}
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
          </select>
          <select
            name="furnish"
            value={propertyData.furnish}
            onChange={handlePropertyData}
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Furnish Type</option>
            <option value="furnished">Furnished</option>
            <option value="semi-furnished">Semi-Furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>
          <select
            name="isAvailable"
            value={propertyData.isAvailable}
            onChange={handlePropertyData}
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Availability</option>
            <option value="available">Available</option>
            <option value="notAvailable">Not Available</option>
          </select>
        </div>

        <h2 className="text-3xl font-bold text-blue-800">Location Info</h2>
        <textarea
          name="address"
          placeholder="Full Address"
          className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={locationData.address}
          onChange={handleLocationData}
          required
        />
        <div className="grid sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={locationData.city}
            onChange={handleLocationData}
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            name="pinCode"
            placeholder="Pin Code"
            value={locationData.pinCode}
            onChange={handleLocationData}
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={locationData.state}
            onChange={handleLocationData}
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={locationData.country}
            onChange={handleLocationData}
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <h2 className="text-3xl font-bold text-blue-800">Pricing</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            name="priceType"
            value={prices.priceType}
            onChange={handlePriceData}
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Price Type</option>
            <option value="rent">Rent</option>
            <option value="price">Price</option>
          </select>
          <input
            type="text"
            name="price"
            value={prices.price}
            onChange={handlePriceData}
            placeholder="Amount"
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow"
          >
            Submit Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostListing;
