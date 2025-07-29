import React, { useEffect, useState, useRef, useContext } from "react";
import { zillowData } from "../../src/assets/assets.js";
import Cards from "./Cards.jsx";
import { FaSearch, FaBuilding } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HouseContextProvider } from "../context/HouseContext.jsx";

const fadeVariant = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } },
};

const Listings = () => {
  const navigate = useNavigate();
  const { token, role } = useContext(HouseContextProvider);
  const [filterBed, setFilterBed] = useState(null);
  const [filterCountry, setFilterCountry] = useState("");
  const [searchName, setSearchName] = useState("");
  const [backendProperties, setBackendProperties] = useState([]);

  const divRef = useRef(null);
  const isInView = useInView(divRef, { once: true, margin: "-100px" });
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

  const uniqueBedrooms = [
    ...new Set(
      [...zillowData, ...backendProperties].map((item) => item.bedrooms)
    ),
  ];
  const uniqueCountries = [
    ...new Set([
      ...zillowData.map((item) => item.country?.toLowerCase()),
      ...backendProperties.map(
        (item) =>
          item.country?.toLowerCase() || item.location?.country?.toLowerCase()
      ),
    ]),
  ];

  return (
    <div id="listings" ref={divRef} className="p-4 md:p-10">
      {/* Heading & Search */}
      <motion.div
        variants={fadeVariant}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        className="text-center"
      >
        <h1 className="text-3xl md:text-2xl font-semibold text-gray-900">
          Featured Properties
        </h1>
        <p className="mt-3 text-base md:text-sm text-gray-600">
          Discover our handpicked selection of premium rental properties.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-6 max-w-2xl mx-auto relative"
        >
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Search by name or location..."
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </form>
      </motion.div>

      <div className="mt-10 flex flex-col md:flex-row md:items-start gap-10">

        <motion.div
          variants={fadeVariant}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="w-full md:w-[30%] space-y-6"
        >
          <div className="sticky top-24 max-h-[calc(100vh-100px)] overflow-y-auto pr-2">
            <div className="space-y-6">
           
              <div>
                <h2 className="text-base font-medium text-gray-700 mb-1">
                  Bedrooms
                </h2>
                <div className="flex flex-wrap md:flex-row gap-2">
                  {uniqueBedrooms.map((bed, index) => (
                    <button
                      key={index}
                      onClick={() => setFilterBed(bed)}
                      className={`px-3 py-1 text-xs rounded-full border transition shadow-sm ${
                        filterBed === bed
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-600"
                      } hover:bg-blue-100`}
                    >
                      {bed <= 1 ? `${bed} Bedroom` : `${bed} Bedrooms`}
                    </button>
                  ))}
                </div>
              </div>

             
              <div>
                <h2 className="text-base font-medium text-gray-700 mb-1">
                  Country
                </h2>
                <div className="flex flex-wrap md:flex-row gap-2">
                  {uniqueCountries.map((country, index) => (
                    <button
                      key={index}
                      onClick={() => setFilterCountry(country)}
                      className={`px-3 py-1 text-xs rounded-full border transition shadow-sm ${
                        filterCountry === country
                          ? "bg-green-600 text-white"
                          : "bg-white text-green-600"
                      } hover:bg-green-100`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>

          
              {(filterBed || filterCountry) && (
                <button
                  onClick={() => {
                    setFilterBed(null);
                    setFilterCountry("");
                  }}
                  className="w-full mt-2 py-2 text-sm bg-red-100 text-red-600 rounded shadow hover:bg-red-200"
                >
                 Reset Filters
                </button>
              )}

              {role?.toLowerCase() === "landlord" && (
                <button
                  onClick={() => navigate("/post-listing")}
                  className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-sm bg-primary text-white rounded hover:bg-primary/90"
                >
                  <FaBuilding /> Post New Listing
                </button>
              )}
            </div>
          </div>
        </motion.div>

    
        <motion.div
          variants={fadeVariant}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="w-full md:w-[70%]"
        >
          <Cards
            filterBed={filterBed}
            filterCountry={filterCountry}
            searchName={searchName}
            backendProperties={backendProperties}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Listings;
