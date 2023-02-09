import Image from "next/image";

import User from "@/interfaces/user";

export default function Recipient(props: {
  isMobile: boolean;
  setShowMessages: React.Dispatch<React.SetStateAction<boolean>>;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  contact: User[];
}) {
  const { isMobile, setShowMessages, setShowProfile, contact } = props;

  return (
    <div className="flex flex-row items-center p-4 space-x-4 border border-b-0">
      {/* Back button */}
      {/* If is mobile, show back button */}
      {isMobile && (
        /* Attribution: https://heroicons.com/ */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          onClick={() => {
            // Hide messages and profile to show chat list
            setShowMessages(false);
            setShowProfile(false);
          }}
          className="w-5 h-5 text-gray-700 hover:text-gray-400 hover:cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      )}

      {/* Contact profile */}
      {contact.map((contact, index) => (
        <div key={index} className="flex flex-row items-center space-x-4">
          {/* Profile picture */}
          <Image
            src={"/images/" + contact.profile_picture}
            alt="User profile picture"
            width={45}
            height={45}
            onClick={() =>
              // If is mobile, hide messages and show profile
              isMobile && (
                setShowMessages(false),
                setShowProfile(true)
              )
            }
            className="rounded-full border hover:cursor-pointer"
          ></Image>

          {/* User name and status */}
          <div>
            <div className="font-medium text-gray-700">
              {contact.first_name + " " + contact.last_name}
            </div>

            <div className="text-xs font-medium text-green-400">Online</div>
          </div>
        </div>
      ))}
    </div>
  );
};