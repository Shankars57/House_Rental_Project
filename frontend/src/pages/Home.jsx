import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Listings from "../components/Listings";
import Explore from "../components/Explore";
import StayUpdated from "../components/StayUpdated";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Listings />
      <Explore />
      <StayUpdated />
      <Footer />
    </div>
  );
};

export default Home;
