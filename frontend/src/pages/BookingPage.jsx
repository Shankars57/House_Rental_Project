import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { zillowData } from "../assets/assets";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Divider,
} from "@mui/material";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const house = zillowData.find((home) => String(home._id) === id);

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    alert(
      `Booking Confirmed!\n\nCheck-in: ${checkIn.toLocaleDateString()}\nCheck-out: ${checkOut.toLocaleDateString()}`
    );

    navigate("/");
  };

  if (!house) {
    return (
      <Typography
        variant="h5"
        color="error"
        sx={{ mt: 8, textAlign: "center" }}
      >
        House not found.
      </Typography>
    );
  }

  return (
    <>
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 10, p: 4 }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring" }}
          className="mb-6 text-lg border rounded-md flex items-center gap-2 px-4 py-2 hover:bg-primary hover:text-white"
          onClick={() => navigate(`/house/${id}`)}
        >
          <FaArrowLeft className="w-4 h-4 text-red-500 hover:text-blue-500" />{" "}
          Go Back
        </motion.button>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom color="primary">
            Book: {house.address}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Agent: {house.agent.name} | {house.agent.phone}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ my: 2 }}>
            <Typography variant="body1" gutterBottom>
              Check-In Date:
            </Typography>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </Box>

          <Box sx={{ my: 2 }}>
            <Typography variant="body1" gutterBottom>
              Check-Out Date:
            </Typography>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn || new Date()}
              dateFormat="dd/MM/yyyy"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1.5 }}
            onClick={handleBooking}
          >
            Confirm Booking
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default BookingPage;
