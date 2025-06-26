import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

export const socketConnection = () => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // your frontend
      methods: ["GET", "POST"],
    },
  });

  // Listen for client connections
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join a private room (e.g., tenant_landlord)
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    // Handle sending messages
    socket.on("send_message", (data) => {
      io.to(data.roomId).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
