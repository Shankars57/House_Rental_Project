import React from "react";
import Sidebar from "./Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Layout = () => {
  const userName = "Bonam Shankar";
  const userSplit = userName.split(" ");
  return (
    <div className="bg-gray-800 h-screen flex">
      <div className="max-sm:w-16 sm:w-20 md:w-60">
        <Sidebar />
      </div>
      <main className="bg-white w-full min-h-screen overflow-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-6 px-4">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Admin Dashboard
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border rounded-full"
              />
            </div>
            <img
              src={`https://ui-avatars.com/api/?name=${userSplit[0]}+${userSplit[1]}&background=f85634&color=fff&rounded=true`}
              alt="avatar"
              className="w-10 h-10 rounded-full hidden md:block"
            />
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
