import { Socket } from "socket.io";

interface SocketIdMap {
  [userName: string]: string;
}

module.exports = function (socket: Socket, socketIdMap: SocketIdMap) {
  // On send contact request
  socket.on("send_contact_request", (data) => {
    const { recipient } = data;
    const recipientSocketId = socketIdMap[recipient]; // Set recipient as the socket id of the recipient

    // If recipient is online send contact request
    if (recipientSocketId) {
      socket.to(recipientSocketId).emit("receive_contact_request", data);
    }
  });
};
