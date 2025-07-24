import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HouseContextProvider } from "../context/HouseContext";

const PropertyViewPage = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const { axiosInstance , image } = useContext(HouseContextProvider);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axiosInstance.get("/listing/all-listings");
        setProperties(res.data.properties);
      } catch (error) {
        toast.error("Failed to fetch properties");
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm("Are you sure to delete this property?");
      if (!confirm) {
        return toast.info("Deletion was cancelled");
      }
      const res = await axiosInstance.delete(`/listing/delete/${id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const viewPage = (id) => {
    navigate(`/property/${id}`);
  };
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Swiper
              spaceBetween={10}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              modules={[Navigation, Pagination, Autoplay]}
              className="w-full h-100"
            >
              {property.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={`${image}/${img}`}
                    alt={`property-${idx}`}
                    className="w-full h-100 object-fit"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {property.title}
                </h2>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    property.isAvailable === "available"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {property.isAvailable}
                </span>
              </div>

              <p className="text-gray-600">{property.description}</p>
              <p className="text-sm text-gray-500">
                Posted on {moment(property.createdAt).format("MMMM Do, YYYY")}
              </p>

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mt-3">
                <p>
                  <strong>Type:</strong> {property.propertyType}
                </p>
                <p>
                  <strong>Furnish:</strong> {property.furnish}
                </p>
                <p>
                  <strong>Bedrooms:</strong> {property.bedrooms}
                </p>
                <p>
                  <strong>Bathrooms:</strong> {property.bathrooms}
                </p>
                <p>
                  <strong>Age:</strong> {property.age} years
                </p>
                <p>
                  <strong>Price:</strong> ₹{property.price}
                </p>
              </div>

              <div className="mt-3 text-sm text-gray-500">
                <p>
                  <strong>Location:</strong> {property.location.address},{" "}
                  {property.location.city}, {property.location.state},{" "}
                  {property.location.country}
                </p>
                <p>
                  <strong>Owner:</strong> {property.owner.firstName}{" "}
                  {property.owner.lastName} ({property.owner.phone})
                </p>
              </div>
            </div>
            <div className="flex items-center px-4 py-6 gap-2 justify-center w-full">
              {" "}
              <button
                onClick={() => viewPage(property._id)}
                className=" border px-6 py-1 rounded-md text-md flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/80"
              >
                <FaEye />
                view
              </button>
              <button
                onClick={() => handleDelete(property._id)}
                className="border px-6 py-1 rounded-md text-lg flex items-center justify-center gap-2 bg-red-500 text-white"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyViewPage;
