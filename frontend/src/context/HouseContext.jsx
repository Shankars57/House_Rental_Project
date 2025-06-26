import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const HouseContextProvider = createContext();

const axiosInstance = axios.create({
  baseURL: "https://house-rental-project.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const HouseContext = ({ children }) => {
  const userUrl = "https://house-rental-project.onrender.com/api/users";
  const image = "https://house-rental-project.onrender.com/uploads"
  const [token, setToken] = useState();
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await axios.get(`${userUrl}/get-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data.success) {
          setRole(data.user.role);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchRole();
  }, []);

  const context = {
    userUrl,
    token,
    setToken,
    axiosInstance,
    image,
    role,
    setRole,
  };
  useEffect(() => {
    const tokenRetrieve = localStorage.getItem("token");
    if (tokenRetrieve) {
      setToken(tokenRetrieve);
    }
  }, []);
  return (
    <HouseContextProvider.Provider value={context}>
      {children}
    </HouseContextProvider.Provider>
  );
};

export default HouseContext;
