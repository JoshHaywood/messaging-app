import Image from "next/image";
import { useState, useEffect } from "react";
import * as io from "socket.io-client";
import { AnimatePresence, motion } from "framer-motion";

import User from "@/interfaces/user";
import Message from "@/interfaces/message";
import Recipient from "./Recipient";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function Messages(props: {
  isMobile: boolean;
  welcomeMessage: boolean;
  showMessages: boolean;
  setShowMessages: React.Dispatch<React.SetStateAction<boolean>>;
  showProfile: boolean;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAccountSettings: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User[];
}) {
  const {
    isMobile,
    welcomeMessage,
    showMessages,
    setShowMessages,
    showProfile,
    setShowProfile,
    setIsAccountSettings,
    profile,
  } = props;

  const socket = io.connect(`http://localhost:${process.env.NEXT_PUBLIC_PORT}`);

  const [message, setMessage] = useState(""); // Message to be sent
  const [messageList, setMessageList] = useState<Message[]>([]); // List of messages

  useEffect(() => {
    socket.on("receive_message", (data: Message) => {
      setMessageList([...messageList, data]);
    });
  }, [socket, messageList]);

  return (
    <AnimatePresence>
      {/* If showMessages is set to true, show the messages */}
      {showMessages && (
        <motion.div
          initial={isMobile && { y: "100%" }}
          animate={isMobile && { y: 0 }}
          exit={isMobile ? { position: "absolute", y: "100%" } : {}}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`${
            // If the welcome message is displayed and the profile isn't displayed allow the message to take up full screen width else account for profiles width
            welcomeMessage && !showProfile
              ? "w-full lg:w-3/4"
              : "w-full lg:w-1/2"
          } h-full flex flex-col`}
        >
          {/* If no recipient has been selected and welcome message is set to true, show the welcome message. Else show message data */}
          {welcomeMessage ? (
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
                setShowMessages={setShowMessages}
                setShowProfile={setShowProfile}
                profile={profile}
              />

              <MessageList 
                isMobile={isMobile}
                setShowMessages={setShowMessages}
                setShowProfile={setShowProfile}
                setIsAccountSettings={setIsAccountSettings}
                messageList={messageList}
              />

              <MessageInput
                profile={profile}
                socket={socket}
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