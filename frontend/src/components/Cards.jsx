import React, { useEffect, useState, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { zillowData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import NewCard from "./NewCard";
import { HouseContextProvider } from "../context/HouseContext";

const Cards = ({ filterBed, filterCountry, searchName }) => {
  const navigate = useNavigate();
  const cardTopRef = useRef(null);

  const [viewCards, setViewCards] = useState(6);
  const [backendProperties, setBackendProperties] = useState([]);
  const { axiosInstance } = useContext(HouseContextProvider);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axiosInstance.get("/listing/all-listings");
        if (res.data.success) {
          setBackendProperties(res.data.properties);
        }
      } catch (err) {
        console.error("Failed to fetch properties", err);
      }
    };

    fetchProperties();
  }, []);

  const normalizeString = (str) => str?.toString().toLowerCase().trim();

  const filterProperties = (data) => {
    return data.filter((item) => {
      const bedCount = parseInt(item.bedrooms);
      const matchesBed = filterBed ? bedCount === parseInt(filterBed) : true;

      const itemCountry = normalizeString(item.location?.country);
      const itemCountryZillow = normalizeString(item?.country);
      const matchesCountry = filterCountry
        ? normalizeString(filterCountry) === itemCountry ||
          normalizeString(filterCountry) === itemCountryZillow
        : true;

      const search = normalizeString(searchName);

      const matchesSearch = search
        ? normalizeString(item.title)?.includes(search) ||
          normalizeString(item.description)?.includes(search) ||
          normalizeString(item.location?.address)?.includes(search) ||
          normalizeString(item.location?.city)?.includes(search) ||
          normalizeString(item.location?.state)?.includes(search) ||
          normalizeString(item.location?.country)?.includes(search) ||
          normalizeString(item?.country)?.includes(search) ||
          normalizeString(item?.city)?.includes(search)
        : true;

      return matchesBed && matchesCountry && matchesSearch;
    });
  };

  const filteredZillow = filterProperties(zillowData);
  const filteredBackend = filterProperties(backendProperties);

  const navigateToPage = (id) => navigate(`/house/${id}`);

  const isDataEmpty =
    filteredZillow.length === 0 && filteredBackend.length === 0;

  return (
    <div ref={cardTopRef}>
      {/* Backend Cards */}
      <NewCard properties={filteredBackend} />

      {/* Zillow (Frontend) Cards */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 p-6 w-full ml-2 md:ml-14">
        {filteredZillow.length > 0 ? (
          filteredZillow.slice(0, viewCards).map((item, index) => (
            <motion.div
              key={item._id || index}
              whileHover={{ scale: 1.03 }}
              className="rounded-md shadow-lg overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative h-[220px]">
                <img
                  src={item.heroImage}
                  alt={item.agent.name}
                  className="w-full h-full object-cover"
                />
                <p className="absolute top-4 right-4 bg-primary/80 text-white text-sm px-3 py-1 rounded-full">
                  {item.bedrooms <= 1
                    ? "1 Bedroom"
                    : `${item.bedrooms} Bedrooms`}
                </p>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center w-full justify-between">
                  <h2 className="text-xl font-semibold text-primary">
                    {item.agent.name}
                  </h2>
                  <span className="flex items-center text-sm gap-1 shadow rounded-full px-2 py-1">
                    <FaStar className="text-yellow-400" />
                    4.9
                  </span>
                </div>
                <p className="text-gray-400 flex items-center text-sm">
                  <FaMapMarkerAlt className="text-gray-400" /> {item.city},{" "}
                  {item.country}
                </p>
                <p className="text-lg font-medium text-green-600">
                  ${item.price} /month
                </p>
                <button
                  className="w-full py-2 rounded-lg bg-black text-white hover:bg-gray-800"
                  onClick={() => navigateToPage(item._id)}
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))
        ) : isDataEmpty ? (
          <div className="col-span-full text-center py-10">
            <p className="text-2xl text-red-500 font-semibold">
              🚫 No houses found. Please try different filters.
            </p>
          </div>
        ) : null}
      </motion.div>
      {/* Show More / Show Less Button */}
      {filteredZillow.length > 6 && (
        <div className="flex justify-center my-6">
          <button
            onClick={() => {
              if (viewCards >= filteredZillow.length) {
                setViewCards(6);
                cardTopRef.current?.scrollIntoView({ behavior: "smooth" });
              } else {
                setViewCards((prev) => prev + 6);
              }
            }}
            className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
          >
            {viewCards >= filteredZillow.length ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cards;
