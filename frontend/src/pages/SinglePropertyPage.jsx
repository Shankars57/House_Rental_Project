import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import moment from "moment";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaArrowLeft,
  FaArrowDown,
  FaArrowUp,
  FaPen,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HouseContextProvider } from "../context/HouseContext";

const SinglePropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const { axiosInstance , image } = useContext(HouseContextProvider);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axiosInstance.get("/listing/all-listings");
        if (res.data.success) {
          setPropertyData(res.data.properties);
        } else {
          toast.error("Failed to load data");
        }
      } catch (err) {
        toast.error("Failed to fetch properties");
      }
    };

    fetchProperty();
  }, [id]);

  const property = propertyData.find((item) => item._id === id);

  if (!property) {
    return (
      <div className="mt-20 text-center text-xl text-red-500">
        🚫 Property not found!
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring" }}
          className="mb-6
           text-lg border rounded-md flex
           items-center gap-2 px-4 py-2 
          hover:bg-primary hover:text-white"
          onClick={() => navigate("/user-profile/properties")}
        >
          <FaArrowLeft /> Back
        </motion.button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:px-10  max-w-5xl mx-auto">
      <motion.button
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring" }}
        className="mb-6 text-lg border rounded-md flex items-center gap-2 px-4 py-2 hover:bg-primary hover:text-white"
        onClick={() => navigate("/user-profile/properties")}
      >
        <FaArrowLeft /> Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          className="w-full h-150 rounded-t-2xl"
        >
          {property.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={`${image}/${img}`}
                alt={`property-${index}`}
                className="w-full h-150 object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-primary">
              {property.title}
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                property.isAvailable === "available"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {property.isAvailable}
            </span>
          </div>

          <p className="text-gray-600 mb-2">
            {property.location.address}, {property.location.city},{" "}
            {property.location.state}, {property.location.country}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Posted on {moment(property.createdAt).format("MMMM Do, YYYY")}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-800 mb-4">
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

          <button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center gap-2 text-sm mb-4 px-3 py-2 rounded-md border hover:bg-gray-50"
          >
            Description {showMore ? <FaArrowUp /> : <FaArrowDown />}
          </button>

          {showMore && (
            <motion.div
              key="description"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
                type: "tween",
              }}
              className="relative h-auto bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl mb-6 text-sm 
             text-gray-700 border border-primary/10 shadow-sm"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="before:content-['“'] after:content-['”'] text-lg italic text-gray-600 leading-relaxed"
              >
                {!property.description
                  ? property.description.slice(0, 150) + "..."
                  : "No description provided. Lorem ipsum dolor,  molestiae facilis, exercitationem delectus at ipsa?"}{" "}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
                id unde placeat quo veritatis, provident quisquam amet fugit
                inventore, iure assumenda expedita debitis vel molestiae
                facilis, exercitationem delectus at ipsa?
              </motion.div>
            </motion.div>
          )}

          <div className="text-sm text-gray-600 mb-4">
            <p>
              <strong>Owner:</strong> {property.owner.firstName}{" "}
              {property.owner.lastName} ({property.owner.phone})
            </p>
            <p>
              <strong>Email:</strong> {property.owner.email}
            </p>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md"
            >
              <FaPen /> Edit property Details
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SinglePropertyPage;
