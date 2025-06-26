import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Listings from "../components/Listings";
import Explore from "../components/Explore";
import Footer from "../components/Footer";
import Subscribe from "../components/Subscribe";
import Stayupdated from "../components/StayUpdated";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Listings />
      <Explore />
      <Subscribe />
      <Footer />
      <Stayupdated />
    </div>
  );
};

export default Home;
