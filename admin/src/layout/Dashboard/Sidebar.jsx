import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaDashcube,
  FaBuilding,
  FaPaperPlane,
  FaPaypal,
  FaComments,
  FaRing,
  FaCog,
  FaUser,
} from "react-icons/fa";

const sidebarData = [
  { path: "/dashboard", name: "Dashboard", icon: <FaDashcube /> },
  { path: "/users", name: "Users", icon: <FaUser /> },
  { path: "/listings", name: "Listings", icon: <FaBuilding /> },
  { path: "/payments", name: "Payments", icon: <FaPaypal /> },
  { path: "/chat", name: "Chats", icon: <FaComments /> },
  { path: "/settings", name: "Settings", icon: <FaCog /> },
];

const Sidebar = () => {
  return (
    <div className="relative overflow-hidden flex flex-col min-h-full pt-6 bg-gray-800">
      <div className="w-full">
        <NavLink
          to="/dashboard"
          className={`
            flex items-center gap-3
            sm:px-2 max-sm:px-2 md:px-6
            py-3.5 text-white
            sm:text-xs md:text-lg
            mt-5 transition-colors duration-200 hover:bg-gray-900
            rounded-full
            max-sm:gap-2
            overflow-hidden
          `}
        >
          <FaPaperPlane />
          <span className="hidden sm:inline">Dashboard</span>
        </NavLink>
      </div>

      <div className="mt-5 text-center">
        {sidebarData.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
              `
              flex items-center gap-3 py-3.5
              sm:px-2 max-sm:px-2 md:px-6
              text-white tracking-wider mt-5
              text-center
              transition-colors duration-200 hover:bg-gray-900
              ${
                isActive
                  ? "w-full border-r-4 border-blue-400 bg-primary/60 text-white font-semibold"
                  : "text-gray-400"
              }
              `
            }
          >
            {item.icon}
            <span className="text-center hidden sm:inline">{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="absolute bottom-10 left-1 right-1 flex justify-center">
        <button
          type="button"
          className="border border-red-600 rounded-md px-4 py-2 text-md text-white hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
