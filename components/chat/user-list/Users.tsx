import Image from "next/image";
import { useState } from "react";
import { Socket } from "socket.io-client";
import axios from "axios";

import User from "@/interfaces/user";
import Message from "@/interfaces/message";

export default function Users(props: {
  socket: Socket;
  isMobile: boolean;
  setWelcomeMessage: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMessages: React.Dispatch<React.SetStateAction<boolean>>;
  messageList: Message[];
  setMessageList: React.Dispatch<React.SetStateAction<Message[]>>;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setIsAccountSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setProfile: React.Dispatch<React.SetStateAction<User[]>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  usersArray: User[];
}) {
  const {
    socket,
    isMobile,
    setWelcomeMessage,
    setShowMessages,
    messageList,
    setMessageList,
    setShowProfile,
    name,
    setIsAccountSettings,
    setProfile,
    setSearchTerm,
    usersArray,
  } = props;
  
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Current index of user in usersArray
  const [selectRecipient, setSelectRecipient] = useState<string>(""); // Current recipient

  // Join room
  const joinRoom = (user: User) => {
    const recipient = user.first_name + " " + user.last_name;

    // If recipient is equal to selectRecipient, return
    if (selectRecipient === recipient) {
      return;
    };

    setSelectRecipient(recipient); // Set selectRecipient to recipient

    socket.emit("join_room", {
      recipient: recipient,
      sender: name,
    });

    axios.get("/message/get", {
      params: {
        sender: name,
        recipient: recipient,
      },
    }).then((res) => {
      // Sort messages by time
      setMessageList(res.data.sort((a: Message, b: Message) => a.time.localeCompare(b.time)));
    });
  };

  return (
    /* Recipient profile */
    <div
      id="users-container"
      className="h-full overflow-y-scroll pr-1 lg:pr-2 -mr-1.5 lg:-mr-3.5 hover:cursor-pointer"
    >
      {usersArray.map((user, index) => (
        <div
          key={index}
          onClick={() => {
            // If is mobile, show messages and hide profile
            isMobile && ( 
              setShowMessages(true),
              setShowProfile(false)
            );
            joinRoom(user); // Join room
            setWelcomeMessage(false); // Hide welcome message
            setIsAccountSettings(false); // Hide account settings
            setProfile([user]); // Set profile to current user
            setSearchTerm(""); // Clear search term
            setCurrentIndex(index); // Set current index to current user
          }}
          className={`${
            // If current index is equal to index, set background color to gray
            index === currentIndex ? "bg-gray-100" : "bg-none"
          } mb-2.5 px-1 lg:px-2.5 flex flex-row items-center py-2 space-x-4 rounded-lg`}
        >
          {/* Profile picture */}
          <Image
            src={"/images/" + user.profile_picture}
            alt="User profile picture"
            width={45}
            height={45}
            className="rounded-full border"
          ></Image>

          {/* User name and message preview */}
          <div className="w-full">
            <div className="relative flex flex-row justify-between">
              <div className="text-gray-700">
                {user.first_name + " " + user.last_name}
              </div>

              <div className="inline-block text-gray-400">
                &#x2022; <span className="text-sm text-blue-400">5min ago</span>
              </div>
            </div>

            {/* Placeholder text used instead of div to prevent overflow */}
            <input
              type="text"
              placeholder="Lorem ipsum vestibulum vitae mi venenatis eleifend mauris iaculis pulvinar est, eu sagittis dolor malesuada et"
              readOnly
              disabled
              className="w-full inline-block ellipsis overflow-hidden overflow-ellipsis whitespace-nowrap outline-none pointer-events-none text-sm text-gray-400 bg-transparent"
            ></input>
          </div>
        </div>
      ))}
    </div>
  );
};