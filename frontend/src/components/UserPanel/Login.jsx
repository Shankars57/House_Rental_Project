import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { HouseContextProvider } from "../../context/HouseContext";
import { assets } from "../../assets/assets.js";
const LoginPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [login, setLogin] = useState(true);
  const [image, setImage] = useState(null);

  const { userUrl, setToken, axiosInstance } = useContext(HouseContextProvider);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleClick = () => {
    setLogin((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postURL = login ? `${userUrl}/login` : `${userUrl}/register`;

    try {
      let dataToSend;

      if (login) {
        dataToSend = formData;
      } else {
        dataToSend = new FormData();
        dataToSend.append("name", formData.name);
        dataToSend.append("email", formData.email);
        dataToSend.append("phone", formData.phone);
        dataToSend.append("location", formData.location);
        dataToSend.append("password", formData.password);
        dataToSend.append("role", formData.role);
        if (image) {
          dataToSend.append("image", image);
        }
      }

      const { data } = await axiosInstance.post(postURL, dataToSend, {
        headers: login ? {} : { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(data.message);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <button
        className="absolute top-10 left-10 px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-orange-500 hover:text-white transition text-sm"
        onClick={() => navigate("/")}
      >
        <FaArrowAltCircleLeft />
        Home
      </button>

      <div className="w-full max-w-sm p-6 sm:m-0 m-6 border border-orange-300 shadow-lg rounded-lg bg-white">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold text-orange-500">
              {login ? "Login" : "Signup"}
            </h1>
            <p className="font-light text-sm text-gray-500">
              {login
                ? "Enter your credentials to Login"
                : "Please enter your personal details to signup"}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col mt-3 w-full text-gray-700"
          >
            {!login && (
              <>
                <div className="flex items-center justify-center w-full relative mb-4">
                  <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    onChange={handleImage}
                    required
                  />
                  <img
                    src={image ? URL.createObjectURL(image) : assets.upload}
                    onClick={() => fileInputRef.current.click()}
                    className="w-24 h-24 object-cover border rounded-full cursor-pointer"
                    alt="upload"
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <label htmlFor="name" className="ml-2 text-sm">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-b-2 border-gray-300 p-2 outline-none"
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <label htmlFor="phone" className="ml-2 text-sm">
                    Phone:
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="border-b-2 border-gray-300 p-2 outline-none"
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <label htmlFor="location" className="ml-2 text-sm">
                    Location:
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="border-b-2 border-gray-300 p-2 outline-none"
                  />
                </div>
              </>
            )}

            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="ml-2 text-sm">
                Email:
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-b-2 border-gray-300 p-2 outline-none"
              />
            </div>

            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="ml-2 text-sm">
                Password:
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border-b-2 border-gray-300 p-2 outline-none"
              />
            </div>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full py-2 px-2 text-sm rounded-lg text-gray-700 cursor-pointer border mb-4 outline-none"
            >
              <option value="">Select your role:</option>
              <option value="Tenant">Tenant</option>
              <option value="Landlord">Landlord</option>
            </select>

            <button
              type="submit"
              className="rounded p-2 w-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
            >
              {login ? "Login" : "Signup"}
            </button>
          </form>

          <div className="mt-4 text-sm">
            {login ? (
              <p>
                Don&apos;t have an account?{" "}
                <span
                  className="text-orange-500 cursor-pointer hover:underline"
                  onClick={handleClick}
                >
                  Register
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  className="text-orange-500 cursor-pointer hover:underline"
                  onClick={handleClick}
                >
                  Login
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
