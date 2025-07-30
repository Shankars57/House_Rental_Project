import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import {
  FaArrowLeft,
  FaArrowDown,
  FaArrowUp,
  FaBookOpen,
  FaPaperPlane,
} from "react-icons/fa";
import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { HouseContextProvider } from "../../context/HouseContext";

const HouseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentName, setCommentName] = useState("");
  const { axiosInstance, image } = useContext(HouseContextProvider);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProperty = async () => {
      try {
        const res = await axiosInstance.get("/listing/get-property");
        if (res.data.success) {
          const matched = res.data.properties.find((item) => item._id === id);
          setProperty(matched || null);
        }
      } catch (err) {
        console.error("Failed to fetch property:", err);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get(`/comments/get-comments/${id}`);
        if (res.data.success) {
          setComments(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchProperty();
    fetchComments();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentName || !newComment) return;

    try {
      const res = await axiosInstance.post(`/comments/${id}`, {
        name: commentName,
        comment: newComment,
      });

      if (res.data.success) {
        setComments((prev) => [res.data.data, ...prev]);
        setCommentName("");
        setNewComment("");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  if (loading) {
    return (
      <p
        className="text-center mt-24
       text-lg font-medium 
       animate-pulse"
      >
        Loading property...
      </p>
    );
  }

  if (!property) {
    return (
      <div className="text-center text-red-500 mt-20 text-lg">
        🚫 Property not found!
        <button
          className="mt-4 px-4 py-2 rounded flex items-center gap-2 bg-primary text-white"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft /> Back
        </button>
      </div>
    );
  }

  const {
    _id,
    owner,
    location,
    images,
    title,
    description,
    bedrooms,
    bathrooms,
    furnish,
    age,
    price,
    isAvailable,
    propertyType,
  } = property;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 mt-20">
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="mb-6 text-lg border border-gray-300 rounded-xl flex items-center gap-2 px-4 py-2 hover:bg-primary hover:text-white transition"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="text-red-500" /> Go Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView="auto"
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="w-full h-[250px] sm:h-[350px] 
          md:h-100 rounded-t-2xl"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={`${image}/${img}`}
                alt={`Property image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <h1 className="text-3xl font-bold text-primary">{title}</h1>
            <span
              className={`inline-block text-sm px-3 py-1 rounded-full font-medium ${
                isAvailable === "available"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {isAvailable?.toUpperCase()}
            </span>
          </div>

          <p className="text-gray-600 text-sm">
            {" "}
            {`${location.address}, ${location.city}, ${location.state} - ${location.pinCode}, ${location.country}`}
          </p>

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-gray-800 text-sm">
            <p>
              <strong> Type:</strong> {propertyType}
            </p>
            <p>
              <strong> Bedrooms:</strong> {bedrooms}
            </p>
            <p>
              <strong> Bathrooms:</strong> {bathrooms}
            </p>
            <p>
              <strong> Furnish:</strong> {furnish}
            </p>
            <p>
              <strong> Age:</strong> {age} years
            </p>
            <p>
              <strong> Price:</strong> ₹{price.toLocaleString()}
            </p>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-lg font-semibold text-primary mb-2">
              👤 Owner Info
            </h2>
            <p>
              <strong>Name:</strong> {owner.firstName} {owner.lastName}
            </p>
            <p>
              <strong>Email:</strong> {owner.email}
            </p>
            <p>
              <strong>Phone:</strong> {owner.phone}
            </p>
          </div>

          <button
            className="flex items-center gap-2 text-sm border px-4 py-2 rounded-md w-fit hover:bg-gray-50 transition"
            onClick={() => setShowDescription((prev) => !prev)}
          >
            {showDescription ? "Hide" : "Show"} Description{" "}
            {showDescription ? <FaArrowUp /> : <FaArrowDown />}
          </button>

        
            {showDescription && (
              <motion.div
                key="desc"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type:"tween",duration: 0.1,  }}
                className="overflow-hidden border border-primary/10 px-4 py-4 bg-gray-50 rounded-xl text-gray-700"
              >
                <p>{description || "No description provided."}</p>
              </motion.div>
            )}
        

          <div className="flex flex-wrap gap-4 pt-6">
            <button
              onClick={() => navigate(`/booking/${property._id}`)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition"
            >
              <FaBookOpen /> Book Now
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white rounded-xl hover:bg-green-800 transition">
              <FaPaperPlane /> Send Message
            </button>
          </div>

          <div className="pt-6 border-t mt-6">
            <h2 className="text-lg font-semibold mb-4">
              Comments ({comments.length})
            </h2>

            <div className="w-full mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet. Be the first!</p>
              ) : (
                comments.map((cmt, i) => (
                  <div
                    key={i}
                    className="sm:w-full p-4 border rounded-md bg-gray-100 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-20">
                      <p className="text-sm font-semibold text-primary">
                        {cmt.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(cmt.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 mt-1">{cmt.comment}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
              <input
                type="text"
                placeholder="Your name"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <textarea
                rows="4"
                placeholder="Type your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <button
                type="submit"
                className="self-start bg-primary text-white px-5 py-2 rounded-md hover:bg-primary/90 transition"
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HouseDetails;
