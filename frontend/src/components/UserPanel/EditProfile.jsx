import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { HouseContextProvider } from "../../context/HouseContext";

const EditProfile = () => {
  const { userUrl, axiosInstance } = useContext(HouseContextProvider);
  const ref = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    avatarUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("No token found");

      try {
        const { data: res } = await axiosInstance.get(`${userUrl}/get-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.success) {
          setData(res.user);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchData();
    if (ref.current) ref.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return toast.error("No token found");
    const confirmUpdate = window.confirm(
      "Are you sure you want to save changes?"
    );
    if (!confirmUpdate) {
      toast.info("Update cancelled!");
      return;
    }
    try {
      const res = await axiosInstance.post(`${userUrl}/edit/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        toast.success("Profile updated successfully!");
        navigate("/user-profile/profile");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex flex-col gap-10 py-16 shadow w-[90%] md:w-[70%] lg:w-[50%] m-auto justify-center items-center bg-white rounded-lg mt-10 relative">
      <button
        className="absolute top-4 left-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 text-sm"
        onClick={() => navigate("/user-profile/profile")}
      >
        ← Go Back
      </button>

      <h1 className="text-3xl font-bold text-primary/70">Edit Profile</h1>

      {data.avatarUrl && (
        <div className="mb-4">
          <img
            src={data.avatarUrl}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-primary object-cover"
          />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full px-8 md:px-12"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-600 font-medium">
            Name:
          </label>
          <input
            ref={ref}
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Enter your name..."
            className="border-b-2 border-gray-300 py-2 px-2 focus:outline-none focus:border-primary"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-600 font-medium">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter your email..."
            className="border-b-2 border-gray-300 py-2 px-2 focus:outline-none focus:border-primary"
            required
            disabled={true}
          />
          <span className="text-sm text-red-600">
            -you can't edit your email*
          </span>
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="text-gray-600 font-medium">
            Phone:
          </label>
          <input
            type="text"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="Enter your phone..."
            className="border-b-2 border-gray-300 py-2 px-2 focus:outline-none focus:border-primary"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="location" className="text-gray-600 font-medium">
            Location:
          </label>
          <input
            type="text"
            name="location"
            value={data.location}
            onChange={handleChange}
            placeholder="Enter your location..."
            className="border-b-2 border-gray-300 py-2 px-2 focus:outline-none focus:border-primary"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
