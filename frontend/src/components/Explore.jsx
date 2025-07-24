import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { exploreData } from "../assets/assets";

const containerVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
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
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
};

const Explore = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="mt-30 mb-20"
      variants={containerVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
    >
      <motion.h1
        variants={cardVariants}
        className="py-4 text-4xl text-center 
        tracking-wider font-medium text-gray-700"
      >
        Explore More
      </motion.h1>
      <motion.p
        variants={cardVariants}
        className="max-sm:text-sm text-gray-600 text-center px-6"
      >
        Explore your favorite destiny place by using our service , these are our
        top picks.
      </motion.p>
      <motion.div
        className="mt-20 flex flex-wrap lg:flex-nowrap gap-10 justify-center items-center"
        id="explore"
        variants={containerVariants}
      >
        {exploreData.map((item, idx) => (
          <motion.div
            key={idx}
            className="shadow w-[300px] rounded-md cursor-pointer overflow-hidden bg-white hover:shadow-2xl transition ease duration-300"
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
          >
            <img src={item.img} className="w-full h-[200px] object-cover" />
            <motion.div className="p-4">
              <h1 className="text-xl text-primary/60">{item.title}</h1>
              <p className="text-sm py-2 text-gray-600">{item.description}</p>
              <button className="py-2 px-4 border rounded bg-primary/80 text-white hover:bg-primary cursor-pointer transition">
                Explore more
              </button>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Explore;
