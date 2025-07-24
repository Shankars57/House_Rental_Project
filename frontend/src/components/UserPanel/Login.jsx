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
    if (file) setImage(file);
  };

  const handleClick = () => setLogin((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postURL = login ? `${userUrl}/login` : `${userUrl}/register`;

    try {
      let dataToSend;

      if (login) {
        dataToSend = formData;
      } else {
        dataToSend = new FormData();
        for (let key in formData) {
          dataToSend.append(key, formData[key]);
        }
        if (image) dataToSend.append("image", image);
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <button
        className="absolute top-6 left-6 px-3 py-2 border border-blue-500 rounded-md flex items-center gap-2 hover:bg-blue-600 hover:text-white transition text-sm text-blue-600"
        onClick={() => navigate("/")}
      >
        <FaArrowAltCircleLeft />
        Home
      </button>

      <div className="w-full max-w-md p-6 sm:m-0 m-6 border border-blue-300 shadow-lg rounded-xl bg-white">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">
            {login ? "Login" : "Signup"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {login
              ? "Enter your credentials to login"
              : "Create an account to get started"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-gray-700"
        >
          {!login && (
            <>
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  onChange={handleImage}
                />
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload}
                  onClick={() => fileInputRef.current.click()}
                  className="w-20 h-20 object-cover border-2 border-dashed border-blue-400 rounded-full cursor-pointer transition hover:opacity-80"
                  alt="upload"
                />
                <span className="text-xs mt-1 text-gray-500">
                  Click to upload image
                </span>
              </div>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input-field"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
                className="input-field"
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-field"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md outline-none"
          >
            <option value="">Select your role</option>
            <option value="Tenant">Tenant</option>
            <option value="Landlord">Landlord</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
          >
            {login ? "Login" : "Signup"}
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          {login ? (
            <p>
              Don&apos;t have an account?{" "}
              <span
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={handleClick}
              >
                Register
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={handleClick}
              >
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
