import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { HouseContextProvider } from "../context/HouseContext";
import { FaWarehouse, FaHouseUser } from "react-icons/fa";

const links = ["Listings", "Explore"];

const Navbar = () => {
  const { token } = useContext(HouseContextProvider);
  const status = true;
  const [linkAct, setLinkAct] = useState("Home");
  const [sticky, setSticky] = useState(false);
  const [menuAct, setMenuAct] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    const stickyHeader = () => {
      setSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", stickyHeader);
    return () => window.removeEventListener("scroll", stickyHeader);
  }, []);

  return (
    <motion.div
      className={`
        flex items-center justify-between  
      p-2 shadow
        ${
          sticky ? "sticky top-0 z-50 bg-white border-b-[0.5px] bg-red-100" : ""
        }
      `}
      transition={sticky ? { type: "spring", stiffness: 500, damping: 10 } : {}}
      animate={sticky ? { scale: 1.01 } : { scale: 1 }}
    >
      {/* Logo */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.9 }}
        className="p-6 "
      >
        <Link
          to="/"
          className="text-primary
          text-2xl
         md:text-lg 
           font-semibold   flex items-center gap-2"
        >
          <FaHouseUser className="text-primary/40" />
          House Hunt
        </Link>
      </motion.div>

      {/* Hamburger Icon (Mobile) */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuAct((prev) => !prev)}
          className="text-2xl cursor-pointer"
        >
          {menuAct ? "✖" : "☰"}
        </button>
      </div>

      <nav className="hidden md:flex gap-5  items-center">
        <ul className="flex items-center gap-5">
          <li
            className="relative p-1
               transition ease duration-500"
          >
            <Link
              to="/"
              onClick={() => setLinkAct("Home")}
              className={`text-md font-medium lg:text-md md:text-sm ${
                linkAct === "Home" ? "text-white" : "text-gray-700"
              }`}
            >
              Home
            </Link>
            {linkAct === "Home" && (
              <motion.div
                layoutId="underline"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute left-0 right-0 top-0 w-full h-full -z-1 bg-primary rounded-md"
              ></motion.div>
            )}
          </li>
          {links.map((items, index) => (
            <li
              key={index}
              className="relative p-1
               transition ease duration-500"
            >
              <a
                href={"#" + items.slice(0, 1).toLowerCase() + items.slice(1)}
                onClick={() => setLinkAct(items)}
                className={`text-md font-medium lg:text-md md:text-sm ${
                  linkAct === items ? "text-white" : "text-gray-700"
                }`}
              >
                {items}
              </a>
              {linkAct === items && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 w-full h-full -z-1 bg-primary rounded-md"
                ></motion.div>
              )}
            </li>
          ))}
        </ul>
        {token ? (
          <button
            className="
        px-4
         py-2 
         md:text-sm
         rounded 
         shadow 
         bg-primary/90
          cursor-pointer 
          lg:text-xl
           text-white"
            onClick={() => navigator("/user-profile")}
          >
            Profile
          </button>
        ) : (
          <button
            className="
        px-4
         py-2 
         md:text-sm
         rounded 
         shadow 
         bg-primary/90
          cursor-pointer 
          lg:text-xl
           text-white"
            onClick={() => navigator("/login")}
          >
            Login
          </button>
        )}
      </nav>

      {/* Mobile Menu */}
      {menuAct && (
        <motion.nav
          className="absolute 
        top-30
        left-0 
        w-full 
        bg-white 
        shadow-md 
         p-2
         flex 
         flex-col
          gap-3
         items-center
         text-center
          md:hidden 
         z-50"
          animate={menuAct ? { scale: 1.1 } : { scale: 0.5 }}
          transition={{ type: "spring", stiffness: 500, dumping: 20 }}
        >
          {links.map((items, index) => (
            <a
              key={index}
              href={`#${items.slice(0, 1).toLowerCase() + items.slice(1)}`}
              onClick={() => {
                setLinkAct(items);
                setMenuAct(false);
              }}
              className={`
              text-md
               font-medium 
               ${linkAct === items ? "text-primary" : "text-gray-700"}`}
            >
              {items}
            </a>
          ))}
          {token ? (
            <button
              className="
        px-4
         py-2 
         md:text-sm
         rounded 
         shadow 
         bg-primary/90
          cursor-pointer 
          lg:text-xl
           text-white"
              onClick={() => navigator("/user-profile")}
            >
              Profile
            </button>
          ) : (
            <button
              className="
        px-4
         py-2 
         md:text-sm
         rounded 
         shadow 
         bg-primary/90
          cursor-pointer 
          lg:text-xl
           text-white"
              onClick={() => navigator("/login")}
            >
              Login
            </button>
          )}
        </motion.nav>
      )}
    </motion.div>
  );
};

export default Navbar;
