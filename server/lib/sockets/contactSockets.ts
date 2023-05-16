import { Socket } from "socket.io";

interface SocketIdMap {
  [userName: string]: string;
}

module.exports = function (socket: Socket, socketIdMap: SocketIdMap) {
  // Handle contact requests
  const handleContactRequest = (eventName: string, emitEventName: string) => {
    socket.on(eventName, (data) => {
      const { recipient } = data;
      const recipientSocketId = socketIdMap[recipient]; // Set recipient as the socket id of the recipient

      // If recipient is online, send the corresponding event
      if (recipientSocketId) {
        socket.to(recipientSocketId).emit(emitEventName, data);
      }
    });
  };

  // Send contact request
  handleContactRequest("send_contact_request", "receive_contact_request");

  // Decline contact request
  handleContactRequest("decline_contact_request", "contact_request_declined");
};
