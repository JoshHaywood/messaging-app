import Image from "next/image";

import User from "@/interfaces/user";

export default function Recipient(props: {
  setShowMessages: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User[];
}) {
  const { setShowMessages, profile } = props;

  return (
    <div className="flex flex-row items-center p-4 space-x-4 border border-b-0">
      {/* Attribution: https://heroicons.com/ */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        onClick={() => setShowMessages(false)}
        className="w-5 h-5 text-gray-700 hover:text-gray-400 hover:cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </svg>

      {profile.map((profile, index) => (
        <div key={index} className="flex flex-row items-center space-x-4">
          {/* Profile picture */}
          <Image
            src={"/images/" + profile.profile_picture}
            alt="User profile picture"
            width={45}
            height={45}
            className="rounded-full border"
          ></Image>

          {/* User name and status */}
          <div>
            <div className="font-medium text-gray-700">
              {profile.first_name + " " + profile.last_name}
            </div>

            <div className="text-xs font-medium text-green-400">Online</div>
          </div>
        </div>
      ))}
    </div>
  );
};