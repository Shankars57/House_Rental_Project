import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";

import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { AdminContext } from "../../context/AdminContextProvider";
import { toast } from "react-toastify";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  const [postData, setPostData] = useState({ 
    email: "", 
    password: "" });
  const { setToken } = useContext(AdminContext);
  useEffect(() => {
    const handleVisible = () => {
      if (visible) {
        ref.current.type = "type";
      } else {
        ref.current.type = "password";
      }
    };
    handleVisible();
  }, []);



  const handleChange = (e) => {
    const {   name ,value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  
    
  };





  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/admin/login",
        postData
      );
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    console.log(postData);
  });
  return (
    <div
      className="h-screen w-full flex
     items-center justify-center "
    >
      <form
        onSubmit={handleSubmit}
        className="border 
      rounded-md shadow-2xl 
      shadow-blue-500
      px-10 py-18 flex flex-col items-center
       gap-5"
      >
        <h1 className="text-4xl font-medium text-gray-700 mb-4">
          <span className="text-blue-700">Admin</span>Login
        </h1>
        <p className="text-lg mb-4 ">
          Enter your credentials to login for{" "}
          <span className="text-blue-700 font-bold">Admin</span> panel
        </p>
        <div className="w-full relative">
          <span className="absolute top-2  p-l-2">
            <FaEnvelope className="w-6 h-6 text-gray-600" />
          </span>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={postData.email}
            onChange={handleChange}
            className="border-b-1 px-8 py-2 text-gray-600 w-full mb-10 outline-none"
            required
          />
        </div>
        <div className="w-full relative">
          <span
            className="absolute top-2  p-l-2 cursor-pointer"
            onClick={() => setVisible((prev) => !prev)}
          >
            {!visible ? (
              <FaEye className="w-6 h-6 text-gray-600" />
            ) : (
              <FaEyeSlash className="w-6 h-6 text-gray-600" />
            )}
          </span>
          <input
            ref={ref}
            type="password"
            placeholder="Password"
            name="password"
            value={postData.password}
            onChange={handleChange}
            className="border-b-1 px-8 py-2 w-full outline-none mb-10"
            required
          />
        </div>
        <button
          type="submit"
          className="px-8 py-2 text-center rounded-md  bg-blue-600 text-white hover:bg-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
