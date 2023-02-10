import Image from "next/image";
import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import { AnimatePresence, motion } from "framer-motion";

import User from "@/interfaces/user";
import SessionUser from "@/interfaces/sessionUser";
import Message from "@/interfaces/message";
import ShowComponent from "@/interfaces/showComponent";

import Recipient from "./Recipient";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function Messages(props: {
  socket: Socket;
  isMobile: boolean;
  messageList: Message[];
  setMessageList: React.Dispatch<React.SetStateAction<Message[]>>;
  contact: User[];
  sessionUser: SessionUser;
  showComponent: ShowComponent;
  setShowComponent: React.Dispatch<React.SetStateAction<ShowComponent>>;
}) {
  const {
    socket,
    isMobile,
    messageList,
    setMessageList,
    contact,
    sessionUser,
    showComponent,
    setShowComponent,
  } = props;

  const [message, setMessage] = useState(""); // Message to be sent

  // On receiving a message, add it to the message list
  useEffect(() => {
    socket.on("receive_message", (data: Message) => {
      // If the message sender is not equal to the current user, add the message to the message list
      if (data.sender !== sessionUser.name) {
        setMessageList(prevMessageList => [...prevMessageList, data].sort((a, b) => {
          // Sort by date
          if (a.date < b.date) return 1; // If a is greater than b list a first
          if (a.date > b.date) return -1; // If a is less than b list b first
          // Sort by time
          if (a.time < b.time) return 1; 
          if (a.time > b.time) return -1;
          return 0;
        }));
      }
    });
  }, [socket, sessionUser.name, setMessageList]);


  return (
    <AnimatePresence>
      {/* If showMessages is set to true, show the messages */}
      {showComponent.showMessages && (
        <motion.div
          initial={isMobile && { y: "100%" }}
          animate={isMobile && { y: 0 }}
          exit={isMobile ? { position: "absolute", y: "100%" } : {}}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`${
            // If the welcome message is displayed and the profile isn't displayed allow the message to take up full screen width else account for profiles width
            showComponent.welcomeMessage && !showComponent.showProfile
              ? "w-full lg:w-3/4"
              : "w-full lg:w-1/2"
          } flex flex-col fixed sm:relative bottom-0 sm:bottom-auto left-0 sm:left-auto right-0 sm:right-auto top-0 sm:top-auto`}
        >
          {/* If no recipient has been selected and welcome message is set to true, show the welcome message. Else show message data */}
          {showComponent.welcomeMessage ? (
            /* Welcome message */
            <div className="h-full flex flex-col justify-center items-center p-5 border">
              <Image
                src="/images/logo.png"
                alt="Chathub logo"
                width={100}
                height={100}
              />

              <div className="mt-8 text-3xl font-semibold tracking-wide text-center md:text-left text-gray-700">
                Welcome to ChatHub
              </div>

              <p className="mt-4 max-w-2xl text-center text-gray-400">
                Where you can connect with friends, family, and colleagues in
                real-time. Start a conversation or join an existing one to share
                updates, thoughts, and memories. With ChatHub, you&apos;re
                always connected to the people who matter most to you. Just
                search for a friend or colleague and start chatting.
              </p>
            </div>
          ) : (
            <>
              <Recipient
                isMobile={isMobile}
                contact={contact}
                showComponent={showComponent}
                setShowComponent={setShowComponent}
              />

              <MessageList 
                isMobile={isMobile}
                sessionUser={sessionUser}
                messageList={messageList}
                showComponent={showComponent}
                setShowComponent={setShowComponent}
              />

              <MessageInput
                socket={socket}
                contact={contact}
                sessionUser={sessionUser}
                message={message}
                setMessage={setMessage}
                messageList={messageList}
                setMessageList={setMessageList}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};