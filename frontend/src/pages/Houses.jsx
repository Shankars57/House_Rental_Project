import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zillowData } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FaPaperPlane,
  FaBookOpen,
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Houses = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activator, setActivator] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState("");
  const [newComment, setNewComment] = useState("");

  const filteredHouse = zillowData.find((item) => String(item._id) === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBookingPage = (id) => {
    navigate(`/booking/${id}`);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentName.trim() || !newComment.trim()) return;

    const newEntry = {
      name: commentName,
      comment: newComment,
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [newEntry, ...prev]);
    setCommentName("");
    setNewComment("");
  };

  if (!filteredHouse) {
    return (
      <div className="mt-20 text-center text-xl text-red-500">
        🚫 House not found!
        <button
          className="block mx-auto mt-4 px-4 py-2 border rounded bg-primary text-white"
          onClick={() => navigate("/")}
        >
          {"<"} Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 mt-20 max-w-6xl mx-auto">
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="mb-6 text-lg border border-gray-300 rounded-xl flex items-center gap-2 px-4 py-2 hover:bg-primary hover:text-white"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="text-red-500" /> Go Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="flex flex-col gap-10 bg-white p-6 sm:p-8 rounded-2xl shadow-lg"
      >
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView="auto"
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-2xl"
        >
          {(filteredHouse?.images?.length > 0
            ? filteredHouse.images
            : Array(4).fill(filteredHouse.heroImage)
          ).map((imgUrl, index) => (
            <SwiperSlide key={index}>
              <img
                src={imgUrl}
                alt={`House image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-primary">
            {filteredHouse.agent.name}
          </h1>
          <p className="text-gray-600 text-sm">
            📍 {filteredHouse.address}, {filteredHouse.city},{" "}
            {filteredHouse.state} - {filteredHouse.zipcode},{" "}
            {filteredHouse.country}
          </p>

          {/* INFO SECTION */}
          <div className="text-sm text-gray-700 grid sm:grid-cols-2 gap-3 mt-2">
            <p>
              <strong>Email:</strong> {filteredHouse.agent.email}
            </p>
            <p>
              <strong>Phone:</strong> {filteredHouse.agent.phone}
            </p>
            <p>
              <strong>License:</strong> {filteredHouse.agent.license}
            </p>
            <p>
              <strong>Broker:</strong> {filteredHouse.agent.broker}
            </p>
            <p>
              <strong>Type:</strong> {filteredHouse.homeType}
            </p>
            <p>
              <strong>Status:</strong> {filteredHouse.homeStatus}
            </p>
            <p>
              <strong>Bedrooms:</strong> {filteredHouse.bedrooms}
            </p>
            <p>
              <strong>Bathrooms:</strong> {filteredHouse.bathrooms}
            </p>
            <p>
              <strong>Living Area:</strong> {filteredHouse.livingAreaSqft} sqft
            </p>
            <p>
              <strong>Lot Size:</strong> {filteredHouse.lotSizeAcres} acres
            </p>
            <p>
              <strong>Year Built:</strong> {filteredHouse.yearBuilt}
            </p>
            <p>
              <strong>Stories:</strong> {filteredHouse.stories}
            </p>
            <p>
              <strong>Garage:</strong>{" "}
              {filteredHouse.features?.hasGarage ? "Yes" : "No"}
            </p>
            <p>
              <strong>Fireplace:</strong>{" "}
              {filteredHouse.features?.hasFireplace ? "Yes" : "No"}
            </p>
            <p>
              <strong>Pool:</strong>{" "}
              {filteredHouse.features?.hasPool ? "Yes" : "No"}
            </p>
            <p>
              <strong>Parking:</strong> {filteredHouse.features?.parkingSpaces}{" "}
              spaces
            </p>
            <p>
              <strong>Cooling:</strong> {filteredHouse.features?.cooling}
            </p>
            <p>
              <strong>Heating:</strong> {filteredHouse.features?.heating}
            </p>
            <p>
              <strong>HOA Fee:</strong> {filteredHouse.features?.hoaFee}
            </p>
          </div>

          <button
            className="flex items-center gap-2 text-sm border px-4 py-2 rounded-md w-fit hover:bg-gray-50"
            onClick={() => setActivator((prev) => !prev)}
          >
            {activator ? "Hide" : "Show"} Description{" "}
            {activator ? <FaArrowUp /> : <FaArrowDown />}
          </button>

          <AnimatePresence>
            {activator && (
              <motion.div
                key="desc"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="overflow-hidden border border-primary/10 px-4 py-4 bg-gray-50 rounded-xl text-gray-700"
              >
                <p>{filteredHouse.description || "No description provided."}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => handleBookingPage(filteredHouse._id)}
              className="flex items-center gap-2 py-2 px-5 bg-primary hover:bg-primary/90 text-white rounded-xl transition"
            >
              <FaBookOpen /> Book
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 py-2 px-5 bg-green-700 hover:bg-green-800 text-white rounded-xl transition"
            >
              <FaPaperPlane /> Message
            </button>
          </div>
        </div>

        {/* 💬 Comments Section */}
        <div className="pt-8 border-t mt-6">
          <h2 className="text-lg font-semibold mb-4">
            💬 Comments ({comments.length})
          </h2>

          <div className="space-y-4 mb-4 grid grid-cols-2 gap-3">
            {comments.length === 0 ? (
              <p className="text-gray-500 col-span-2">
                No comments yet. Be the first!
              </p>
            ) : (
              comments.map((cmt, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-md bg-gray-50 shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-primary">
                      {cmt.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(cmt.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="mt-1 text-gray-700">{cmt.comment}</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter your name..."
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <textarea
              rows="5"
              placeholder="Type your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition w-fit"
            >
              Add Comment
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Houses;
