import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

import ChatContext from "@/components/chat/ChatContext";
import User from "@/interfaces/user";
import Message from "@/interfaces/message";

export default function AcceptedContacts(props: {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  usersArray: User[];
}) {
  const { setSearchTerm, usersArray } = props;

  const {
    socket,
    isMobile,
    sessionUser,
    showComponent,
    setMessageList,
    setContact,
    setShowComponent,
  } = useContext(ChatContext);

  const [currentIndex, setCurrentIndex] = useState<number>(0); // Current index of user in usersArray
  const [selectRecipient, setSelectRecipient] = useState<string>(""); // Current recipient

  // Recent messages interface
  type RecentMessages = {
    [key: string]: {
      message: string;
      image: string;
      time: string;
      date: string;
      timeDiff: string;
      dateDiff: string;
    };
  };

  const [recentMessages, setRecentMessages] = useState<RecentMessages>({}); // Recent messages

  // Time comparison helper function
  function compareTimes(time1: string, time2: string) {
    const [hours1, minutes1] = time1.split(":");
    const [hours2, minutes2] = time2.split(":");

    // Set dates to today
    const date1 = new Date();
    date1.setHours(Number(hours1), Number(minutes1), 0, 0);

    const date2 = new Date();
    date2.setHours(Number(hours2), Number(minutes2), 0, 0);

    // Get difference in minutes
    const diffInMs = date1.getTime() - date2.getTime();
    const diffInMinutes = diffInMs / (1000 * 60);

    return diffInMinutes;
  }

  // Date comparison helper function
  function compareDates(date: string) {
    const storedDate = new Date(date);
    const today = new Date();

    // Ignore the year when comparing dates
    storedDate.setFullYear(today.getFullYear());

    storedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // Calculate the difference in days
    const timeDiff = today.getTime() - storedDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff;
  }

  // Get recent messages
  const getRecentMessages = () => {
    // Get most recent message from each conversation
    axios
      .get("/message/get/recent", {
        params: {
          sender: sessionUser.name,
        },
      })
      .then((res) => {
        const messages = res.data;

        // Reduce array
        const recentMessages = messages.reduce(
          (acc: RecentMessages, message: Message) => {
            const isMessageFromUser = message.sender === sessionUser.name;
            // If message is from user, recipient is other user
            const otherUser = isMessageFromUser
              ? message.recipient
              : message.sender;
            const currentMessage = {
              message: message.message,
              image: message.image,
              time: message.time,
              date: message.date,
            };

            // Get time difference
            const currentTime = new Date();
            const formattedCurrentTime = `${currentTime.getHours()}:${currentTime.getMinutes()}`;

            const diffInMinutes = compareTimes(
              formattedCurrentTime,
              currentMessage.time
            );

            const storedDate = currentMessage.date;

            // If message is more than 1 day old
            const diffInDays = compareDates(storedDate);

            let dateDiff;

            // If message is more than 1 day old
            if (diffInDays < 2) {
              dateDiff = `${diffInDays} day ago`;
              // else displays weeks
            } else if (diffInDays < 7) {
              dateDiff = `${diffInDays} weeks ago`;
              // else displays months
            } else if (diffInDays < 30) {
              const diffInWeeks = Math.floor(diffInDays / 30.44);
              dateDiff = `${diffInWeeks} month ago`;
            } else if (diffInDays < 60) {
              dateDiff = "last month";
            } else {
              dateDiff = "A long time ago";
            }

            let timeDiff;

            // If message less than an hour ago
            if (diffInMinutes < 1) {
              timeDiff = "just now";
            } else if (diffInMinutes < 2) {
              timeDiff = `${Math.round(diffInMinutes)} min ago`;
            } else if (diffInMinutes < 60) {
              timeDiff = `${Math.round(diffInMinutes)} mins ago`;
              // Else message is more than an hour ago
            } else {
              const diffInHours = Math.floor(diffInMinutes / 60);
              if (diffInDays >= 1) {
                timeDiff = dateDiff; // Use dateDiff if message is over 24 hours old
              } else if (diffInHours === 1) {
                timeDiff = `${diffInHours} hour ago`;
              } else {
                timeDiff = `${diffInHours} hours ago`;
              }
            }

            // If other user is not in accumulator or message is more recent than current message in accumulator
            if (
              !acc[otherUser] ||
              message.date >
                messages.find(
                  (m: Message) =>
                    m.sender === otherUser || m.recipient === otherUser
                )?.date
            ) {
              // Add message to accumulator
              acc[otherUser] = {
                message: currentMessage.message as string,
                image: currentMessage.image as string,
                time: currentMessage.time as string,
                date: currentMessage.date as string,
                timeDiff: timeDiff as string,
                dateDiff: dateDiff as string,
              };
            }

            return acc;
          },
          {}
        );

        setRecentMessages(recentMessages);
      });
  };

  // Get recent messages on mount
  useEffect(() => {
    getRecentMessages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionUser.name]);

  // Update recent messages when message is sent or received
  useEffect(() => {
    const updateRecentMessages = (message: Message) => {
      const { sender, recipient, date } = message;
      const isMessageFromUser = sender === sessionUser.name;
      const otherUser = isMessageFromUser ? recipient : sender;

      const recentMessagesArray = Object.values(
        recentMessages
      ) as unknown as Message[];
      const mostRecentMessage = recentMessagesArray.find(
        (m: Message) => m.sender === otherUser || m.recipient === otherUser
      );

      if (
        !recentMessages[otherUser] ||
        (mostRecentMessage?.date && date > mostRecentMessage.date)
      ) {
        getRecentMessages();
      }
    };

    socket.on("send_message", updateRecentMessages);
    socket.on("receive_message", updateRecentMessages);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionUser.name, socket, recentMessages]);

  // Join room
  const joinRoom = (user: User) => {
    const recipient = user.first_name + " " + user.last_name;

    // If recipient is equal to selectRecipient, return
    if (selectRecipient === recipient) {
      return;
    }

    setSelectRecipient(recipient); // Set selectRecipient to recipient

    // Join room
    socket.emit("join_room", {
      recipient: recipient,
      sender: sessionUser.name,
    });

    // Get messages
    axios
      .get("/message/get/conversation", {
        params: {
          sender: sessionUser.name,
          recipient: recipient,
        },
      })
      .then((res) => {
        // Sort messages by time
        setMessageList(
          res.data.sort((a: Message, b: Message) => {
            // Sort by date
            if (a.date > b.date) return 1; // If a is greater than b list a first
            if (a.date < b.date) return -1; // If a is less than b list b first
            // Sort by time
            if (a.time > b.time) return 1;
            if (a.time < b.time) return -1;
            return 0;
          })
        );
      });
  };

  return (
    /* Recipient profile */
    <div
      id="users-container"
      className="h-full overflow-y-scroll -mr-1.5 lg:-mr-3.5 pr-1 lg:pr-2 hover:cursor-pointer"
    >
      {usersArray.map((user, index) => (
        <div
          key={index}
          onClick={() => {
            // If is mobile, show messages and hide profile
            isMobile
              ? setShowComponent({
                  ...showComponent,
                  welcomeMessage: false,
                  showMessages: true,
                  showProfile: false,
                })
              : setShowComponent({
                  ...showComponent,
                  welcomeMessage: false,
                  showProfile: true,
                  isAccountSettings: false,
                });
            joinRoom(user); // Join room
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
            src={user.profile_picture}
            alt="User profile picture"
            width={45}
            height={45}
            className="aspect-square rounded-full border"
          />

          {/* User name and message preview */}
          <div className="w-full">
            <div className="relative flex flex-row justify-between">
              <div className="text-gray-700">
                {user.first_name + " " + user.last_name}
              </div>

              <div className="inline-block text-gray-400">
                {recentMessages[user.first_name + " " + user.last_name] && (
                  <>&#x2022;</>
                )}

                <span className="ml-1 text-sm text-blue-400">
                  {recentMessages[user.first_name + " " + user.last_name] &&
                    recentMessages[user.first_name + " " + user.last_name]
                      .timeDiff}
                </span>
              </div>
            </div>

            {/* Placeholder text used instead of div to prevent overflow */}
            <input
              type="text"
              placeholder={
                // If recent message is an image, show "Image" else show message
                recentMessages[user.first_name + " " + user.last_name] &&
                recentMessages[user.first_name + " " + user.last_name].image
                  ? "Image"
                  : recentMessages[user.first_name + " " + user.last_name]
                  ? recentMessages[user.first_name + " " + user.last_name]
                      .message
                  : "No messages"
              }
              readOnly
              disabled
              className="w-full inline-block ellipsis overflow-hidden overflow-ellipsis whitespace-nowrap outline-none pointer-events-none text-sm text-gray-400 bg-transparent"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
