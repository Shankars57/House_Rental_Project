import Header from "./components/Header";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/UserPanel/Login";
import Houses from "./pages/Houses";
import Profile from "./pages/User/Profile";
import Layout from "./pages/User/Layout";
import PendingList from "./pages/User/PendingList";
import EditProfile from "./components/UserPanel/EditProfile";
// import Message from "./components/Message/Message";
import PostListing from "./components/UserPanel/PostListing";
import BookingPage from "./pages/BookingPage";
import PropertyViewPage from "./pages/PropertyViewPage";
import SinglePropertyPage from "./pages/SinglePropertyPage";
import HouseDetails from "./pages/backend/HouseDetails";
const App = () => {
  return (
    <div
      className=" lg:m-auto
    lg:w-[80%]
     md:w-[95%] 
     md:m-auto"
    >
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/house/:id" element={<Houses />}></Route>
        <Route path="/user-profile" element={<Layout />}>
          <Route index path="profile" element={<Profile />} />
          <Route path="properties" element={<PropertyViewPage />}></Route>
          <Route path="list" element={<PendingList />} />
        </Route>
        <Route path="/edit-profile/:id" element={<EditProfile />}></Route>
        {/* <Route path="/message" element={<Message />}></Route> */}
        <Route path="/post-listing" element={<PostListing />}></Route>
        <Route path="/booking/:id" element={<BookingPage />}></Route>
        <Route path="/property/:id" element={<SinglePropertyPage />}></Route>
        <Route path="/property-details/:id" element={<HouseDetails />}></Route>
      </Routes>
    </div>
  );
};

export default App;
