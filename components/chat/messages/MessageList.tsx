import Image from "next/image";
import { useRef, useEffect } from "react";

import User from "@/interfaces/user";
import SessionUser from "@/interfaces/sessionUser";
import Message from "@/interfaces/message";
import ShowComponent from "@/interfaces/showComponent";

export default function MessageList(props: {
  isMobile: boolean;
  contact: User[];
  sessionUser: SessionUser;
  messageList: Message[];
  showComponent: ShowComponent;
  setShowComponent: React.Dispatch<React.SetStateAction<ShowComponent>>;
}) {
  const {
    isMobile,
    contact,
    sessionUser,
    messageList,
    showComponent,
    setShowComponent,
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
      <div className="text-sm italic text-center text-gray-400">
        This is the beginning of you conversation with{" "}
        {contact[0].first_name + " " + contact[0].last_name}.
      </div>

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

                  {/* If the message is a text message, show it, else show the image */}
                  {message.message !== null && message.image === null ? (
                    <div
                      ref={bottomRef}
                      className="inline-block justify-end break-words p-2.5 text-[13px] rounded-xl rounded-tr-none text-white bg-blue-500"
                    >
                      {message.message}
                    </div>
                  ) : (
                    message.image !== null && (
                      <div ref={bottomRef}>
                        <Image
                          src={message.image}
                          alt="Message image"
                          width={200}
                          height={200}
                          className="inline-block justify-end p-0.5 rounded-xl"
                        />
                      </div>
                    )
                  )}
                </div>

                {/* Profile picture */}
                <div className="h-full">
                  <Image
                    src={sessionUser.profilePicture}
                    alt="User profile picture"
                    width={35}
                    height={35}
                    onClick={() =>
                      // If on mobile, show the account settings page
                      isMobile &&
                      setShowComponent({
                        ...showComponent,
                        showMessages: false,
                        showProfile: true,
                        isAccountSettings: true,
                      })
                    }
                    className="aspect-square rounded-full border hover:cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              /* Recipient message */
              <div className="flex flex-row space-x-2.5">
                {/* Profile picture */}
                <div className="h-full">
                  <Image
                    src={contact[0].profile_picture}
                    alt="User profile picture"
                    width={35}
                    height={35}
                    onClick={() =>
                      // If the device is mobile, show the profile and hide the messages
                      isMobile &&
                      setShowComponent({
                        ...showComponent,
                        showMessages: false,
                        showProfile: true,
                      })
                    }
                    className="aspect-square rounded-full border hover:cursor-pointer"
                  />
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

                  {/* If the message is a text message, show it, else show the image */}
                  {message.message !== null && message.image === null ? (
                    <div
                      ref={bottomRef}
                      className="inline-block break-words p-2.5 text-[13px] rounded-xl rounded-tl-none text-gray-700 bg-gray-100"
                    >
                      {message.message}
                    </div>
                  ) : (
                    message.image !== null && (
                      <div ref={bottomRef}>
                        <Image
                          src={message.image}
                          alt="Message image"
                          width={200}
                          height={200}
                          className="inline-block break-words p-0.5 rounded-xl"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
