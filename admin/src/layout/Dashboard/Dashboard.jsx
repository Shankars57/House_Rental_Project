import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaCheckCircle,
  FaDollarSign,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";


const activityData = [
  { date: "2025-06-15", signups: 10, listings: 5 },
  { date: "2025-06-16", signups: 7, listings: 3 },
  { date: "2025-06-17", signups: 4, listings: 2 }, 
  { date: "2025-06-18", signups: 12, listings: 2 },
];

const metricCards = [
  {
    title: "Total Listings",
    value: 5,
    icons: <FaBuilding />,
    bgClass: "bg-gray-800",
  },
  {
    title: "Total Users",
    value: 10,
    icons: <FaUser />,
    bgClass: "bg-gray-600",
  },
  {
    title: "Pending Approvals",
    value: 20,
    icons: <FaCheckCircle />,
    bgClass: "bg-blue-400",
  },
  {
    title: "Total Revenue",
    value: "2,500",
    icons: <FaDollarSign />,
    bgClass: "bg-orange-400",
  },
];

const chartData = [
  { month: "Jan", signups: 20, listings: 10 },
  { month: "Feb", signups: 40, listings: 25 },
  { month: "Mar", signups: 35, listings: 20 },
  { month: "Apr", signups: 50, listings: 30 },
  { month: "May", signups: 65, listings: 40 },
];

const cityData = [
  { city: "Hyderabad", value: 40 },
  { city: "Mumbai", value: 30 },
  { city: "Delhi", value: 20 },
  { city: "Bangalore", value: 10 },
];

const occupancyData = [
  { name: "Occupied", value: 75 },
  { name: "Vacant", value: 25 },
];

const COLORS = ["#0088FE", "#FF8042"];

const Dashboard = () => {
 

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const formattedSelected = selectedDate.format("YYYY-MM-DD");

  const selectedData = activityData.find(
    (item) => item.date === formattedSelected
  ) || {
    signups: 0,
    listings: 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="h-full px-5"
    >
     
      

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {metricCards.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-lg text-white ${card.bgClass}`}
          >
            <div className="text-3xl flex items-center gap-3">
              {card.icons} {card.value}
            </div>
            <div className="text-md mt-2">{card.title}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Monthly Sign-ups & Listings
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="signups" stroke="#8884d8" />
              <Line type="monotone" dataKey="listings" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Most Active Cities</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884a4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Room Occupancy Rate Section */}
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-xl mx-auto mb-10">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Room Occupancy Rate
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={occupancyData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {occupancyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md w-full md:max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Activity on Selected Date
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 justify-between">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              displayStaticWrapperAs="desktop"
              slotProps={{ textField: { variant: "outlined" } }}
            />
          </LocalizationProvider>

          <div className="flex flex-col justify-center items-center text-center">
            <h3 className="text-lg font-medium">Date: {formattedSelected}</h3>
            <p className="text-gray-600 mt-4 text-md">
              <span className="font-bold">{selectedData.signups}</span> Users
              Signed Up
            </p>
            <p className="text-gray-600 text-md">
              <span className="font-bold">{selectedData.listings}</span>{" "}
              Listings Posted
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
