import http from "http";
import { Server } from "socket.io";
import crypto from "crypto";

const socket = (server: http.Server) => {
  const io = new Server(server);

  // On connection
  io.on("connection", (socket) => {
    // On join room
    socket.on("join_room", (data) => {
      const roomName = generateRoomName(data.recipient, data.sender);
      socket.join(roomName); // Join a conversation
    });

    // On send message
    socket.on("send_message", (data) => {
      const roomName = generateRoomName(data.recipient, data.sender);
      socket.to(roomName).emit("receive_message", data); // Send to recipient
    });
  });

  return io;
};

// Generate room name
function generateRoomName(recipient: string, sender: string) {
  const users = [recipient, sender].sort(); // Sort users
  const hash = crypto.createHash("sha256"); // Create hash
  hash.update(users.join("")); // Join users
  return hash.digest("hex"); // Return hash
};

module.exports = socket;