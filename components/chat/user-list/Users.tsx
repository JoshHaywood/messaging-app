import Image from "next/image";
import { useState } from "react";

import User from "@/interfaces/user";

export default function Users(props: {
  isMobile: boolean;
  setWelcomeMessage: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMessages: React.Dispatch<React.SetStateAction<boolean>>;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAccountSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setProfile: React.Dispatch<React.SetStateAction<User[]>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  usersArray: User[];
}) {
  const {
    isMobile,
    setWelcomeMessage,
    setShowMessages,
    setShowProfile,
    setIsAccountSettings,
    setProfile,
    setSearchTerm,
    usersArray,
  } = props;
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Current index of user in usersArray

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