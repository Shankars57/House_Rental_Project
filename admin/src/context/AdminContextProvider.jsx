import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const context = {
    token,
    setToken
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);
  return (
    <AdminContext.Provider value={context}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
