import Image from "next/image";

import Message from "@/interfaces/message";

export default function MessageList(props: {
  isMobile: boolean;
  setShowMessages: React.Dispatch<React.SetStateAction<boolean>>;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAccountSettings: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  messageList: Message[];
}) {
  const {
    isMobile,
    setShowMessages,
    setShowProfile,
    setIsAccountSettings,
    name,
    messageList,
  } = props;

  return (
    <div
      id="messages-container"
      className="h-full p-4 pt-8 space-y-5 overflow-y-scroll border"
    >
      {messageList.map((message, index) => {
        return (
          <div key={index}>
            {name === message.sender ? (
              /* Sender message */
              <div className="flex flex-row justify-end space-x-2.5">
                {/* Message */}
                <div className="max-w-[55%]">
                  <div className="flex justify-end mb-1 text-[10px] text-gray-400">
                    {message.content.time}
                  </div>

                  <div className="justify-end break-words p-2.5 text-[13px] rounded-xl rounded-tr-none text-white bg-blue-500">
                    {message.content.message}
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
                      {message.recipient}
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {message.content.time}
                    </div>
                  </div>

                  <div className="break-words p-2.5 text-[13px] rounded-xl rounded-tl-none text-gray-700 bg-gray-100">
                    {message.content.message}
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