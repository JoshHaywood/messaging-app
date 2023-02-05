import Image from "next/image";
import { useState } from "react";

import User from "@/interfaces/user";

export default function Users(props: { usersArray: User[]; setRecipient: (recipient: string) => void; }) {
  const { usersArray, setRecipient } = props;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div
      id="users-container"
      className="h-full overflow-y-scroll pr-2 -mr-3.5 hover:cursor-pointer"
    >
      {usersArray.map((user, index) => (
        <div
          key={index}
          onClick={() => {
            setCurrentIndex(index);
            setRecipient(user.email);
          }}
          className={`${
            index === currentIndex ? "bg-gray-100" : "bg-none"
          } mb-2.5 px-2.5 flex flex-row items-center py-2 space-x-4 rounded-lg`}
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
            <div className="text-gray-700">
              {user.first_name + " " + user.last_name}
            </div>

            <div className="relative flex flex-row text-sm text-gray-400">
              {/* Placeholder text used instead of div to prevent overflow */}
              <input
                className="ellipsis w-3/5 overflow-hidden overflow-ellipsis whitespace-nowrap outline-none pointer-events-none"
                type="text"
                placeholder="Vestibulum vitae mi venenatis eleifend"
                readOnly
                disabled
              ></input>

              <div className="w-2/5 text-gray-400">
                &#x2022; <span className="text-blue-400">5min ago</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};