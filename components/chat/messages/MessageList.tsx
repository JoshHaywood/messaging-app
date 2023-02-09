import Image from "next/image";
import { useRef, useEffect } from "react";

import SessionUser from "@/interfaces/sessionUser";
import Message from "@/interfaces/message";

export default function MessageList(props: {
  isMobile: boolean;
  setShowMessages: React.Dispatch<React.SetStateAction<boolean>>;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAccountSettings: React.Dispatch<React.SetStateAction<boolean>>;
  sessionUser: SessionUser;
  messageList: Message[];
}) {
  const {
    isMobile,
    setShowMessages,
    setShowProfile,
    setIsAccountSettings,
    sessionUser,
    messageList,
  } = props;

  const bottomRef = useRef<HTMLDivElement>(null);

  // Scrolls to bottom of message list
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [messageList]);

  return (
    <div
      id="messages-container"
      className="h-full p-4 pt-8 space-y-5 overflow-y-scroll border"
    >
      {messageList.map((message, index) => {
        const prevMessage = messageList[index - 1]; // Previous message
        const showDate = prevMessage ? prevMessage.date !== message.date : true; // Show date if the previous message is not the same date
        return (
          <div key={index}>
            {/* If the previous message is not the same date, show the date */}
            {showDate && (
              <div className="mt-4 text-sm font-medium italic text-center text-gray-400">
                {message.date}
              </div>
            )}

            {/* If the message is from the user, show it on the right side of the screen, else show it on the left */}
            {sessionUser.name === message.sender ? (
              /* Sender message */
              <div className="flex flex-row justify-end space-x-2.5">
                {/* Message */}
                <div className="max-w-[55%]">
                  <div className="flex justify-end mb-1 text-[10px] text-gray-400">
                    {message.time}
                  </div>

                  <div
                    ref={bottomRef}
                    className="inline-block justify-end break-words p-2.5 text-[13px] rounded-xl rounded-tr-none text-white bg-blue-500"
                  >
                    {message.message}
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
                      isMobile &&
                      (setShowMessages(false),
                      setShowProfile(true),
                      setIsAccountSettings(true))
                    }
                    className="rounded-full border hover:cursor-pointer"
                  ></Image>
                </div>
              </div>
            ) : (
              /* Recipient message */
              <div className="flex flex-row space-x-2.5">
                {/* Profile picture */}
                <div className="h-full">
                  <Image
                    src="/images/default-profile.png"
                    alt="User profile picture"
                    width={35}
                    height={35}
                    onClick={() =>
                      // If the device is mobile, show the profile and hide the messages
                      isMobile && (setShowMessages(false), setShowProfile(true))
                    }
                    className="rounded-full border hover:cursor-pointer"
                  ></Image>
                </div>

                {/* Message */}
                <div className="max-w-[55%]">
                  <div className="flex flex-row items-baseline space-x-1.5 mb-1">
                    <div className="text-[12px] text-gray-700">
                      {message.sender}
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {message.time}
                    </div>
                  </div>

                  <div
                    ref={bottomRef}
                    className="inline-block break-words p-2.5 text-[13px] rounded-xl rounded-tl-none text-gray-700 bg-gray-100"
                  >
                    {message.message}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};