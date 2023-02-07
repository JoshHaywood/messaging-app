import http from "http";
import { Server } from 'socket.io';

const socket = (server: http.Server ) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    socket.emit("data", { message: "Connection successful" }); // emit an event "data" with data object
  });

  return io;
};

module.exports = socket;