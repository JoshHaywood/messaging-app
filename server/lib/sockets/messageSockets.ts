import crypto from "crypto";
import { Socket } from "socket.io";

import Message from "@/interfaces/message";

module.exports = function (socket: Socket) {
  // On join room
  socket.on("join_room", (data: Message) => {
    const roomName = generateRoomName(data.recipient, data.sender);
    socket.join(roomName); // Join a conversation
  });

  // On send message
  socket.on("send_message", (data: Message) => {
    const roomName = generateRoomName(data.recipient, data.sender);
    socket.to(roomName).emit("receive_message", data); // Send to recipient
  });

  // Generate room name
  function generateRoomName(recipient: string, sender: string) {
    const users = [recipient, sender].sort(); // Sort users
    const hash = crypto.createHash("sha256"); // Create hash
    hash.update(users.join("")); // Join users
    return hash.digest("hex"); // Return hash
  }
};
