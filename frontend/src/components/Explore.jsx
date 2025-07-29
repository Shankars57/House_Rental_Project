import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { exploreData } from "../assets/assets";

const containerVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.6,
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.6 },
  },
};

const Explore = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="min-h-screen py-16 px-4 sm:px-6 md:px-10"
      id="explore"
      variants={containerVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
    >
      <div>
        <motion.h1
          variants={cardVariants}
          className="py-4 text-3xl sm:text-4xl text-center tracking-wide font-semibold text-gray-700"
        >
          Explore More
        </motion.h1>
        <motion.p
          variants={cardVariants}
          className="text-sm sm:text-base text-gray-600 text-center px-2 sm:px-6"
        >
          Explore your favorite destiny place by using our service. These are our top picks.
        </motion.p>
      </div>

      <motion.div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center"
        variants={containerVariants}
      >
        {exploreData.map((item, idx) => (
          <motion.div
            key={idx}
            className="w-full max-w-sm bg-white rounded-md shadow-md hover:shadow-2xl transition duration-300 cursor-pointer"
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-48 sm:h-56 object-cover rounded-t-md"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold text-primary/70">
                {item.title}
              </h1>
              <p className="text-sm text-gray-600 py-2">{item.description}</p>
              <button className="mt-2 px-4 py-2 bg-primary/80 text-white rounded hover:bg-primary transition">
                Explore More
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Explore;
