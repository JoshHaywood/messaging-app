import Image from "next/image";
import { useState } from "react";
import { Socket } from "socket.io-client";
import axios from "axios";

import User from "@/interfaces/user";
import SessionUser from "@/interfaces/sessionUser";
import Message from "@/interfaces/message";
import ShowComponent from "@/interfaces/showComponent";

export default function ContactList(props: {
  socket: Socket;
  isMobile: boolean;
  setMessageList: React.Dispatch<React.SetStateAction<Message[]>>;
  setContact: React.Dispatch<React.SetStateAction<User[]>>;
  sessionUser: SessionUser;
  showComponent: ShowComponent;
  setShowComponent: React.Dispatch<React.SetStateAction<ShowComponent>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  usersArray: User[];
}) {
  const {
    socket,
    isMobile,
    setMessageList,
    setContact,
    sessionUser,
    showComponent,
    setShowComponent,
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

    // Join room
    socket.emit("join_room", {
      recipient: recipient,
      sender: sessionUser.name,
    });

    // Get messages
    axios.get("/message/get", {
      params: {
        sender: sessionUser.name,
        recipient: recipient,
      },
    }).then((res) => {
      // Sort messages by time
      setMessageList(res.data.sort((a: Message, b: Message) => {
          // Sort by date
          if (a.date < b.date) return 1; // If a is greater than b list a first
          if (a.date > b.date) return -1; // If a is less than b list b first
          // Sort by time
          if (a.time < b.time) return 1; 
          if (a.time > b.time) return -1;
          return 0;
        })
      );
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
            isMobile ? ( 
              setShowComponent(({
                ...showComponent,
                welcomeMessage: false,
                showMessages: true,
                showProfile: false,
              }))
            ) : (
              setShowComponent(({
                ...showComponent,
                welcomeMessage: false,
                showProfile: true,
                isAccountSettings: false,
              }))
            )
            joinRoom(user); // Join room
            // Hide welcome message, show profile, and hide account settings
            setContact([user]); // Set profile to current user
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
          />

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