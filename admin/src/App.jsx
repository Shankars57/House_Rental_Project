import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./layout/Dashboard/Dashboard";
import Listings from "./layout/Dashboard/Listings";
import Payments from "./layout/Dashboard/Payments";
import Users from "./layout/Dashboard/Users";
import Chat from "./layout/Dashboard/Chat";
import Settings from "./layout/Dashboard/Settings";
import {ToastContainer} from 'react-toastify'
import Login from "./layout/Dashboard/Login";
const App = () => {
  return (
    <div>
    <ToastContainer />
    <Routes>
    <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<Layout />}>

        <Route index path="dashboard" element={<Dashboard />} />
      
        <Route path="users" element={<Users />} />
        <Route path="payments" element={<Payments />} />
        <Route path="listings" element={<Listings />} />
        <Route path="chat" element={<Chat />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
    </div>
  );
};

export default App;
