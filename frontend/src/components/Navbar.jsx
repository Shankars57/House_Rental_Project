import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { HouseContextProvider } from "../context/HouseContext";
import { FaHouseUser } from "react-icons/fa";

const links = ["Listings", "Explore"];

const Navbar = () => {
  const { token } = useContext(HouseContextProvider);
  const [linkAct, setLinkAct] = useState("Home");
  const [sticky, setSticky] = useState(false);
  const [menuAct, setMenuAct] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`w-full transition-all duration-300 z-50 ${
        sticky ? "sticky top-0 bg-white shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 0.9 }}
        >
          <Link
            to="/"
            onClick={() => setLinkAct("Home")}
            className="text-xl md:text-2xl font-semibold flex items-center gap-2 text-primary"
          >
            <FaHouseUser className="text-primary/50" />
            House Rental
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6">
            <li>
              <Link
                to="/"
                onClick={() => setLinkAct("Home")}
                className={`text-sm font-medium relative py-1 px-2 transition ${
                  linkAct === "Home"
                    ? "text-white bg-primary rounded"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                Home
              </Link>
            </li>
            {links.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setLinkAct(item)}
                  className={`text-sm font-medium relative py-1 px-2 transition ${
                    linkAct === item
                      ? "text-white bg-primary rounded"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => navigate(token ? "/user-profile" : "/login")}
            className="ml-4 px-4 py-2 text-sm font-medium bg-primary text-white rounded hover:bg-primary/90 transition"
          >
            {token ? "Profile" : "Login"}
          </button>
        </nav>

        {/* Hamburger */}
        <div className="md:hidden z-50">
          <button
            onClick={() => setMenuAct(!menuAct)}
            className="text-2xl text-gray-700 focus:outline-none"
          >
            {menuAct ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuAct && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-white px-4 pt-4 pb-6 border-t shadow"
        >
          <ul className="flex flex-col gap-4 text-center">
            <li>
              <Link
                to="/"
                onClick={() => {
                  setLinkAct("Home");
                  setMenuAct(false);
                }}
                className={`block py-2 px-3 rounded ${
                  linkAct === "Home"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                Home
              </Link>
            </li>
            {links.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => {
                    setLinkAct(item);
                    setMenuAct(false);
                  }}
                  className={`block py-2 px-3 rounded ${
                    linkAct === item
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setMenuAct(false);
                  navigate(token ? "/user-profile" : "/login");
                }}
                className="w-full bg-primary text-white py-2 rounded mt-2 font-medium"
              >
                {token ? "Profile" : "Login"}
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
