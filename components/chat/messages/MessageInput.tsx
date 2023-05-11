import Image from "next/image";
import { useState } from "react";
import { Socket } from "socket.io-client";
import axios from "axios";

import User from "@/interfaces/user";
import SessionUser from "@/interfaces/sessionUser";
import Message from "@/interfaces/message";
import createFileInputHandler from "@/components/utils/createFileInputHandler";

export default function MessageInput(props: {
  socket: Socket;
  contact: User[];
  sessionUser: SessionUser;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  messageList: Message[];
  setMessageList: React.Dispatch<React.SetStateAction<Message[]>>;
}) {
  const {
    contact,
    sessionUser,
    socket,
    message,
    setMessage,
    messageList,
    setMessageList,
  } = props;

  const [messageType, setMessageType] = useState<string>("text"); // Message type
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [error, setError] = useState<string>(""); // Error message

  // File button click handler
  const handleFileUpload = createFileInputHandler((result: string | null) => {
    if (result) {
      setPreviewImage(result);
    }
  });

  // Send message
  const sendMessage = () => {
    // If message type is text
    if (messageType === "text") {
      if (message === "") return; // If message is empty, return

      // Message content
      const messageContent: Message = {
        sender: sessionUser.name,
        recipient: contact[0].first_name + " " + contact[0].last_name,
        message: message,
        image: null,
        time: new Date().toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        date: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
      };

      // Store the message in the database
      axios.post("/message/store", {
        sender: sessionUser.name,
        recipient: messageContent.recipient,
        message: messageContent.message,
        time: messageContent.time,
        date: messageContent.date,
      });

      socket.emit("send_message", messageContent); // Send message to server
      setMessageList([...messageList, messageContent]); // Update the state with the new message
    } else if (messageType === "image") {
      if (!previewImage) return; // If there is no preview image, return

      // Create a new FormData object
      const formData = new FormData();

      // Append the image data to the FormData object
      formData.append("image", previewImage);

      // Message content
      const messageContent: Message = {
        sender: sessionUser.name,
        recipient: contact[0].first_name + " " + contact[0].last_name,
        message: "",
        image: previewImage,
        time: new Date().toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        date: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
      };

      // Store the message in the database
      axios.post("/message/store", {
        sender: sessionUser.name,
        recipient: messageContent.recipient,
        image: messageContent.image,
        time: messageContent.time,
        date: messageContent.date,
      });

      socket.emit("send_message", messageContent); // Send message to server
      setMessageList([...messageList, messageContent]); // Update the state with the new message

      setPreviewImage(null); // Clear the preview image
    }

    setMessage(""); // Clear input
  };

  return (
    <>
      {/* Error message */}
      {error && previewImage === null && (
        <div className="p-5 italic text-red-500">{error}</div>
      )}

      {/* Preview image */}
      {previewImage && (
        <div className="w-full flex flex-row pt-2.5 space-x-1 bg-gray-100">
          <Image
            src={previewImage}
            alt="Preview"
            width={200}
            height={200}
            className="w-1/2 mx-2.5"
          />

          {/* Remove button */}
          {/* Attribution: https://heroicons.com/ */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            onClick={() => {
              setPreviewImage(null);
              setError("");
            }}
            className="w-6 h-6 text-gray-700 hover:text-black hover:cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      )}

      <div className="flex flex-row items-center p-5 space-x-2.5 border border-b-0 bg-white">
        {/* Image button */}
        {/* Attribution: https://heroicons.com/ */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          onClick={() => {
            handleFileUpload();
            setMessageType("image"); // Set message type to image
          }}
          className="w-8 h-8 text-gray-500 hover:text-blue-500 hover:cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>

        {/* File button */}
        {/* Attribution: https://heroicons.com/ */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          onClick={() => setMessageType("file")} // Set message type to file
          className="w-7 h-7 text-gray-500 hover:text-blue-500 hover:cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
          />
        </svg>

        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onClick={() => {
            setMessageType("text");
            setPreviewImage(null);
            setError("");
          }}
          onChange={(e) => setMessage(e.target.value)} // Set messages value as input
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Send message on enter key
          className="w-full p-2.5 text-sm rounded-lg text-gray-700 bg-gray-100 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-500"
        ></input>

        {/* Send button */}
        {/* Attribution: https://heroicons.com/ */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          onClick={sendMessage} // Send message on click
          className="w-8 h-8 text-gray-500 hover:text-blue-500 hover:cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
          />
        </svg>
      </div>
    </>
  );
}
