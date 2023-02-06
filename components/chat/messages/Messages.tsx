import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import User from "@/interfaces/user";
import Recipient from "./Recipient";
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

  function RecipientMessage() {
    return (
      <div className="flex flex-row space-x-2.5">
        {/* Profile picture */}
        <div className="h-full">
          <Image
            src="/images/default-profile.png"
            alt="User profile picture"
            width={35}
            height={35}
            onClick={() => isMobile && (
              setShowMessages(false),
              setShowProfile(true)
            )}
            className="rounded-full border hover:cursor-pointer"
          ></Image>
        </div>
  
        {/* Message */}
        <div className="max-w-[55%]">
          <div className="flex flex-row items-baseline space-x-1.5 mb-1">
            <div className="text-[12px] text-gray-700">John Doe</div>
            <div className="text-[10px] text-gray-400">00:00 AM</div>
          </div>
  
          <div className="break-words p-2.5 text-[13px] rounded-xl rounded-tl-none text-gray-700 bg-gray-100">
            Message content
          </div>
        </div>
      </div>
    );
  };
  
  function SenderMessage() {
    return (
      <div className="flex flex-row justify-end space-x-2.5">
        {/* Message */}
        <div className="max-w-[55%]">
          <div className="flex justify-end mb-1 text-[10px] text-gray-400">
            00:00 AM
          </div>
  
          <div className="justify-end break-words p-2.5 text-[13px] rounded-xl rounded-tr-none text-white bg-blue-500">
            Message content
          </div>
        </div>
  
        {/* Profile picture */}
        <div className="h-full">
          <Image
            src="/images/default-profile.png"
            alt="User profile picture"
            width={35}
            height={35}
            onClick={() => 
            // If on mobile, show the account settings page
            isMobile && (
              setShowMessages(false),
              setShowProfile(true),
              setIsAccountSettings(true)
            )}
            className="rounded-full border hover:cursor-pointer"
          ></Image>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {/* If showMessages is set to true, show the messages */}
      {showMessages && (
        <motion.div
          initial={isMobile && { y: "100%" }}
          animate={isMobile && { y: 0 }}
          exit={{ position: "absolute", y: "100%" }}
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

              <div
                id="messages-container"
                className="h-full p-4 pt-8 space-y-5 overflow-y-scroll border"
              >
                <RecipientMessage />

                <SenderMessage />
              </div>

              <MessageInput />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};