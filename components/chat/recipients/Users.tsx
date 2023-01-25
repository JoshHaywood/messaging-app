import { useState } from "react";

interface props {
  usersArray: {
    first_name: string;
    last_name: string;
    profile_picture: string;
  }[];
};

export default function Users({ usersArray }: props) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div
      id="users-container"
      className="h-full overflow-y-scroll pr-2 -mr-3.5 hover:cursor-pointer"
    >
      {usersArray.map((user, index) => (
        <div
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`${
            index === currentIndex ? "bg-gray-100" : "bg-none"
          } mb-2.5 px-2.5 flex flex-row items-center py-2 space-x-4 rounded-lg`}
        > 
          {/* Profile picture */}
          <img
            src={"../images/" + user.profile_picture}
            alt="User profile picture"
            width={45}
            height={45}
            className="rounded-full border"
          ></img>

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