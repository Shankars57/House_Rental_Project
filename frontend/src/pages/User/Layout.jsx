import React, { useContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/UserPanel/Sidebar";
import { HouseContextProvider } from "../../context/HouseContext";
import {  FaHouseUser } from "react-icons/fa";

const Layout = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(HouseContextProvider);
  const handleClick = () => {
    navigate("/");
    setToken("");
    localStorage.removeItem("token");
  };
  return (
    <>
      <header className="flex items-center justify-between h-[70px] px-4 sm:px-12 border-b border-gray-200 shadow-sm bg-white">
        <Link
          to="/"
          className="text-primary flex items-center gap-2 font-bold text-xl lg:text-2xl tracking-wide"
        >
          <FaHouseUser className="text-primary/40" />
          House Rental
        </Link>

        {token ? (
          <button
            onClick={handleClick}
            className="text-sm px-6 py-2 cursor-pointer bg-primary hover:bg-primary/90 text-white rounded-full transition"
          >
            {" "}
            Logout{" "}
          </button>
        ) : (
          <button
            className="text-sm px-6 py-2 cursor-pointer bg-primary hover:bg-primary/90 text-white rounded-full transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </header>

      <div className="flex h-[calc(100vh-70px)] bg-gray-50">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
