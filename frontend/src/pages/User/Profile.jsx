import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaDotCircle, FaPen, FaTrash } from "react-icons/fa";
import { HouseContextProvider } from "../../context/HouseContext";
import { toast } from "react-toastify";
import moment from "moment";
import { motion } from "framer-motion";

const containerVariants = {
  initial: { y: 100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      type: "spring",
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const childVariants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      type: "spring",
    },
  },
};

const Profile = () => {
  const navigate = useNavigate();
  const [filterTenants, setFilterTenants] = useState([]);
  const { userUrl, axiosInstance ,image } = useContext(HouseContextProvider);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return toast.error("No token found");

        const { data } = await axiosInstance.get(`/users/get-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data.success) {
          setFilterTenants([data.user]);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    dataFetch();
  }, [userUrl]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Token is missing");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this account?"
    );
    if (!confirmDelete) return toast.info("Delete process cancelled");

    try {
      const { data } = await axios.delete(`${userUrl}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        localStorage.removeItem("token");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="w-full py-12 max-w-3xl mx-auto px-6 sm:px-8 md:px-12 rounded-xl shadow-2xl bg-white"
    >
      {filterTenants.map((items) => (
        <motion.div
          variants={childVariants}
          key={items._id}
          className="flex flex-col items-center gap-8"
        >
          <motion.div variants={childVariants}>
            <img
              src={
                items.image
                  ? `${image}/${items.image}`
                  : items.avatarUrl
              }
              alt={`${items.name}'s avatar`}
              className={`w-28 h-28 rounded-full object-cover border-4 ${
                items.image ? "border-blue-500" : "border-gray-300"
              } shadow-md`}
            />
          </motion.div>

          <motion.div
            variants={childVariants}
            className="text-center text-gray-800 space-y-2"
          >
            <h1 className="text-2xl sm:text-3xl font-bold">{items.name}</h1>
            <p className="text-sm sm:text-base">Email: {items.email}</p>
            <p className="text-sm sm:text-base">Phone: {items.phone}</p>
            <p className="text-sm sm:text-base">Location: {items.location}</p>
            <p className="text-sm sm:text-base">
              Joined At: {moment(items.createdAt).format("DD MMMM YYYY")}
            </p>

            <p
              className={`inline-flex items-center gap-2 px-4 py-1 mt-2 text-sm font-medium rounded-full border shadow-sm ${
                items.status === "Active"
                  ? "bg-green-100 text-green-700 border-green-400"
                  : "bg-red-100 text-red-700 border-red-400"
              }`}
            >
              <FaDotCircle className="text-xs" /> {items.role}
            </p>

            <motion.div
              variants={childVariants}
              className="flex flex-wrap justify-center gap-4 mt-6"
            >
              <button
                onClick={() => navigate("/edit-profile/" + items._id)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-transform transform hover:-translate-y-1"
              >
                <FaPen className="text-xs" /> Edit Profile
              </button>
              <button
                onClick={() => handleDelete(items._id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-transform transform hover:-translate-y-1"
              >
                <FaTrash className="text-xs" /> Delete Account
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Profile;
