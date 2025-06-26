import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
   const ref = useRef();
   const inView = useInView(ref,{once:true, margin:"-100px"})
  return (
    <motion.footer
    ref={ref}
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, type: "spring", damping: 20 }}
      className=" md:w-[100%] 
       max-sm:w-[100%] bg-primary/10 text-primary/80 mt-20 px-6 py-12 lg:px-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h2 className="text-xl font-semibold mb-4">CoLivly</h2>
          <p className="text-sm text-gray-600">
            Your trusted partner in finding modern, affordable co-living spaces
            tailored for comfort, connection, and convenience.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium mb-2">Quick Links</h3>
          <a href="#listings" className="hover:text-primary transition">
            Listings
          </a>
          <a href="#explore" className="hover:text-primary transition">
            Explore
          </a>
          <a href="#about" className="hover:text-primary transition">
            About Us
          </a>
          <a href="#contact" className="hover:text-primary transition">
            Contact
          </a>
        </div>

        {/* Social + Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Connect with Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-600 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-sky-500 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-700 transition">
              <FaLinkedin />
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Email: support@colivly.com
          </p>
          <p className="text-sm text-gray-600">Phone: +91 91105 60147</p>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CoLivly. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
