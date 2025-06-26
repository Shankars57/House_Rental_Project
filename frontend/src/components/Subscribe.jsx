import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

const Subscribe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="initial"
      animate={isInView && "animate"}
      className=" bg-primary/80
       shadow-primary/50
       shadow-2xl
       rounded
       h-[40vh] 
  flex 
  items-center
  flex-col
  gap-3
  justify-center
  "
    >
      <motion.h1
        variants={cardVariants}
        className="  max-sm:text-2xl text-center md:text-6xl
   text-white"
      >
        Stay Updated.
      </motion.h1>

      <motion.p variants={cardVariants} 
      className="text-white md:text-xl font-lg ">
        Get notified of new listings from your inbox.
      </motion.p>
      <motion.form variants={cardVariants} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter your email..."
          className="
    p-2
    border 
    border-r-0
     rounded-r-none 
     bg-white
      rounded-md 
      outline-none "
          required
        />
        <button
          type="submit"
          className="bg-[red] 
          p-2 
          rounded-l-none
           text-white
           rounded-md 
           cursor-pointer"
        >
          Subscribe
        </button>
      </motion.form>
    </motion.div>
  );
};

export default Subscribe;
