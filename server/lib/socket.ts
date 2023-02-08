import http from "http";
import { Server } from 'socket.io';

const socket = (server: http.Server ) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    socket.on("send_message", (data) => {
      socket.broadcast.emit("receive_message", data);
    });
  });

  return io;
};

module.exports = socket;