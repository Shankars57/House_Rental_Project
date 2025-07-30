import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import moment from "moment";
import { HouseContextProvider } from "../context/HouseContext";
import Tilt from "react-parallax-tilt";

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const NewCard = ({ properties = [] }) => {
  const navigate = useNavigate();
  const { image } = useContext(HouseContextProvider);

  const isNewProperty = (createdAt) => {
    const postedDate = moment(createdAt);
    return moment().diff(postedDate, "hours") <= 24;
  };
 

  return (
    <motion.div
      className="grid
     grid-cols-1 
    sm:grid-cols-2 
    lg:grid-cols-2 gap-8
     p-6
      w-full
      ml-2
      md:ml-14"
    >
      {properties.length > 0 &&
        properties.map((item, idx) => (
          <Tilt
            key={item._id || idx}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareEnable={true}
            glareMaxOpacity={0.15}
            transitionSpeed={700}
            perspective={1200}
            className="rounded-2xl"
          >
            <motion.div
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl shadow-md
               overflow-hidden
                bg-white transition-all 
                duration-300 
                hover:shadow-xl"
            >
              <div className="relative h-52">
                <img
                  src={`${image}/${item.images?.[0]}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {isNewProperty(item.createdAt) && (
                  <span
                    className="absolute 
                  top-4 left-4 bg-green-600 
                  text-white text-xs 
                  px-3 py-1 rounded-full"
                  >
                    NEW
                  </span>
                )}
                <span className="absolute top-4 right-4 bg-primary/80 text-white text-sm px-3 py-1 rounded-full">
                  {item.bedrooms <= 1
                    ? "1 Bedroom"
                    : `${item.bedrooms} Bedrooms`}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-primary truncate">
                    {item.title}
                  </h2>
                  <span className="flex items-center text-sm gap-1 rounded-full px-2 py-1 shadow-md text-yellow-800">
                    <FaStar className="text-yellow-400" /> 4.9
                  </span>
                </div>

                <p className="text-gray-400 text-sm flex items-center gap-1 truncate">
                  <FaMapMarkerAlt className="text-gray-400" />
                  {item.location?.city}, {item.location?.country}
                </p>

                <p className="text-green-600 text-lg font-medium">
                  ₹{item.price} /month
                </p>

                <button
                  className="w-full py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                  onClick={() => navigate(`/property-details/${item._id}`)}
                >
                  View Details
                </button>
              </div>
            </motion.div>
          </Tilt>
        ))}
    </motion.div>
  );
};

export default NewCard;
