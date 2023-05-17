import http from "http";
import { Server } from "socket.io";

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

    require("./messageSockets")(socket);

    require("./contactSockets")(socket, socketIdMap);
  });

  return io;
};

module.exports = socket;
