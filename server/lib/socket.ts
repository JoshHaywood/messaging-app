import http from "http";
import { Server } from 'socket.io';

const socket = (server: http.Server ) => {
  const io = new Server(server);

  // On connection
  io.on("connection", (socket) => {
    // On send message
    socket.on("send_message", (data) => {
      console.log("send_message", data);
      socket.broadcast.emit("receive_message", data); // Send to all except sender
    });
  });

  return io;
};

module.exports = socket;