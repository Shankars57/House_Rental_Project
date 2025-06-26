import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPortrait, FaList } from "react-icons/fa";

const navItems = [
  {
    to: "/user-profile/profile",
    icon: <FaPortrait className="w-5 h-5" />,
    label: "User Profile",
  },
  {
    to: "/user-profile/properties",
    icon: <FaHome className="w-5 h-5" />,
    label: "Posted Properties",
  },
  {
    to: "/user-profile/list",
    icon: <FaList className="w-5 h-5" />,
    label: "Pending List",
  },
];

const Sidebar = () => {
  return (
    <div
      className="flex flex-col 
    border-r border-gray-200 min-h-full pt-6 bg-white"
    >
      {navItems.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/user-profile/profile"} // only use `end` for the root link
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5  sm:px-6 max-sm:px-6 md:px-9 md:min-w-64
             transition-colors duration-200 hover:bg-gray-100
             ${
               isActive
                 ? "border-r-4 border-primary bg-primary/10 text-primary font-semibold"
                 : "text-gray-700"
             }`
          }
        >
          {icon}
          <span className="hidden md:block">{label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
