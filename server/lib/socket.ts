import http from "http";
import { Server } from 'socket.io';

const socket = (server: http.Server ) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    socket.on("message", (data) => {
      console.log(data);
    });
  });

  return io;
};

module.exports = socket;