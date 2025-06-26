import React from "react";
import { motion } from "framer-motion";
import { FaArrowDown, FaMapMarkerAlt, FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className="w-full min-h-[85vh] flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-20 px-6 md:px-10 lg:px-20 py-10 bg-cover bg-center bg-no-repeat"
    >
      <motion.div
        initial={{ x: -900, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1.2,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className="flex flex-col justify-center gap-8 text-center items-center w-full max-w-screen-lg"
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Find Co-living Space <br />
          <span className="text-primary mt-2">Rental Home</span>
        </h1>

        <p className="text-sm md:text-base font-medium text-gray-600 px-2 md:px-8">
          Discover comfortable and affordable co-living homes near you. Your
          dream home is just a search away.
        </p>

        <div className="w-full px-4 py-6 bg-white rounded-md shadow-md border border-primary/10">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col lg:flex-row gap-4 w-full"
          >
            <div className="relative flex-1">
              <FaMapMarkerAlt className="text-primary/40 text-lg absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Location"
                className="w-full lg:w-60 pl-10 pr-4
                 py-2 border border-primary/10 
                 rounded-md text-gray-700
                  outline-none"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <select className="w-full md:w-1/2 px-3 py-2 border border-primary/10 rounded-md outline-none">
                <option value="">Property Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
              </select>

              <select className="w-full md:w-1/2 px-3 py-2 border border-primary/10 rounded-md outline-none">
                <option value="">Price Range</option>
                <option value="500">Below $1000</option>
                <option value="1000">Below $1000</option>
                <option value="2000">Below $2000</option>
                <option value="3000">Below $3000</option>
              </select>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-md w-full lg:w-auto"
            >
              <FaSearch />
              <span>Search</span>
            </button>
          </form>
        </div>
        <div className="flex gap-20">
          <p className="flex flex-col text-gray-600 md:text-lg">
            <span className="text-primary md:text-2xl font-bold">10,000+</span>
            Properties Listed
          </p>
          <p className="flex flex-col text-gray-600 md:text-lg">
            <span className="text-primary md:text-2xl font-bold">50,000+</span>
            Happy Renters
          </p>
          <p className="flex flex-col text-gray-600 md:text-lg">
            <span className="text-primary md:text-2xl font-bold">5,000+</span>
            Verified Owners
          </p>
        </div>

        <a
          href="#listings"
          className="bg-primary/80 text-white hover:bg-primary transition text-sm md:text-base px-6 py-3 rounded-md shadow"
        >
          Explore Spaces
        </a>

        <motion.span
          className="text-2xl"
          initial={{ y: 0 }}
          animate={{
            y: 10,
            transition: {
              ease: "easeInOut",
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
        >
          <FaArrowDown />
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default Header;
