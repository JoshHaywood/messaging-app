import http from "http";
import { Server } from "socket.io";
import crypto from "crypto";

interface SocketIdMap {
  [userName: string]: string;
}

const socket = (server: http.Server, {}) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const socketIdMap: SocketIdMap = {}; // Map of socket ids to usernames

  // On connection
  io.on("connection", (socket) => {
    // Set socket id to username
    socket.on("set_session_data", (data) => {
      const { userName } = data;

      socketIdMap[userName] = socket.id; // Set socket id to username
    });

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

    // On send contact request
    socket.on("send_contact_request", (data) => {
      const { recipient } = data;
      const recipientSocketId = socketIdMap[recipient]; // Set recipient as the socket id of the recipient

      // If recipient is online send contact request
      if (recipientSocketId) {
        socket.to(recipientSocketId).emit("receive_contact_request", data);
      }
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
}

module.exports = socket;
