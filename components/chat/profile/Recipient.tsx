import Image from "next/image";
import { useState } from "react";

import User from "@/interfaces/user";
import Button from "@mui/material/Button";

const buttons = [
  {
    name: "Media",
  },
  {
    name: "Links",
  },
  {
    name: "Files",
  },
];

const mediaContent = [
  {
    image: "default-profile.png",
  },
  {
    image: "default-profile.png",
  },
  {
    image: "default-profile.png",
  },
  {
    image: "default-profile.png",
  },
  {
    image: "default-profile.png",
  },
  {
    image: "default-profile.png",
  },
  {
    image: "default-profile.png",
  },
  {
    image: "default-profile.png",
  },
  {
    image: "default-profile.png",
  },
  {
    image: "default-profile.png",
  },
  {
    image: "default-profile.png",
  },
  {
    image: "default-profile.png",
  },
];

export default function Recipient(props: {
  isMobile: boolean;
  setShowMessages: React.Dispatch<React.SetStateAction<boolean>>;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User[];
  about: boolean;
  setAbout: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    isMobile,
    setShowMessages,
    setShowProfile,
    profile,
    about,
    setAbout,
  } = props;

  const [media, setMedia] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <>
      {isMobile && (
        <div
          id="close-profile"
          onClick={() => {
            setShowMessages(true);
            setShowProfile(false);
          }}
          className="flex flex-row items-center p-5 space-x-2.5 bg-gray-50 hover:cursor-pointer"
        >
          {/* Attribution: https://heroicons.com/ */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-gray-700 hover:cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>

          <div className="text-gray-700 hover:cursor-pointer">Profile</div>
        </div>
      )}

      {profile.map((profile, index) => (
        <div key={index}>
          {/* Profile picture */}
          <div className="mx-auto p-5 text-center">
            <Image
              src={"/images/" + profile.profile_picture}
              alt="User profile picture"
              width={125}
              height={125}
              className="mx-auto rounded-full border"
            ></Image>

            <div className="mt-4 text-xl font-medium text-gray-700">
              {profile.first_name + " " + profile.last_name}
            </div>

            <div className="mt-1 text-xs text-green-400">Online</div>
          </div>

          {/* About */}
          <div
            id="about"
            onClick={() => setAbout(!about)}
            className="mt-4 px-5 py-3 border border-x-0 hover:cursor-pointer"
          >
            <div className="flex flex-row justify-between">
              <div className="font-medium text-gray-700 hover:cursor-pointer">
                About
              </div>

              {/* If about is true, show the up arrow, else show the down arrow */}
              {about ? (
                /* Attribution: https://heroicons.com/ */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 transition-colors duration-300 ease-in-out"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              ) : (
                /* Attribution: https://heroicons.com/ */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 transition-colors duration-300 ease-in-out"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              )}
            </div>

            {about && (
              <p className="mt-2 text-sm text-gray-400">{profile.about}</p>
            )}
          </div>

          {/* Media */}
          <div
            id="media"
            className={`${media ? "border-0" : "border-b"} px-5 py-3`}
          >
            <div
              onClick={() => setMedia(!media)}
              className="flex flex-row justify-between hover:cursor-pointer"
            >
              <div className="font-medium text-gray-700">
                Media. Files and Links
              </div>

              {/* If media is true, show the up arrow, else show the down arrow */}
              {media ? (
                /* Attribution: https://heroicons.com/ */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 transition-colors duration-300 ease-in-out"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              ) : (
                /* Attribution: https://heroicons.com/ */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 transition-colors duration-300 ease-in-out"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              )}
            </div>

            {/* If media is true, show the contents, else don't show anything */}
            {media && (
              <>
                {/* Buttons */}
                <div className="flex flex-row mt-4 space-x-2.5 xl:space-x-5">
                  {buttons.map((button, index) => (
                    <Button
                      key={index}
                      variant="contained"
                      onClick={() => setCurrentIndex(index)}
                      sx={{
                        fontSize: "0.75rem",
                        lineHeight: "1rem",
                        textTransform: "none",
                        boxShadow: "none",
                        borderRadius: "1.5rem",
                        transition: "all 0.3s ease-in-out",
                        color: index === currentIndex ? "#0ea5e9" : "#9ca3af",
                        backgroundColor:
                          index === currentIndex ? "#e0f2fe" : "#f3f4f6",

                        "&:hover": {
                          boxShadow: "none",
                          color: "#0284c7",
                          backgroundColor: "#e0f2fe",
                        },
                      }}
                    >
                      {button.name}
                    </Button>
                  ))}
                </div>

                {/* If the current index is 0, show the media contents, else don't show anything */}
                {currentIndex === 0 && (
                  /* Media contents */
                  <div
                    id="media-container"
                    className="mt-4 h-[534px] xl:h-[494px] overflow-y-scroll"
                  >
                    <div className="grid grid-cols-2 2xl:grid-cols-3 gap-1">
                      {mediaContent.map((media, index) => (
                        <Image
                          key={index}
                          src={"/images/" + media.image}
                          alt="Chat media"
                          width={120}
                          height={120}
                          className="w-full h-auto rounded"
                        ></Image>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
};