import Image from "next/image";
import { useState } from "react";

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

export default function Recipient() {
  const [about, setAbout] = useState<boolean>(false);

  const [media, setMedia] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div className="w-1/4 h-full flex flex-col">
      {/* Profile picture */}
      <div className="mx-auto p-5 text-center">
        <Image
          src="/images/default-profile.png"
          alt="User profile picture"
          width={125}
          height={125}
          className="rounded-full border"
        ></Image>

        <div className="mt-4 text-xl font-medium text-gray-700">John Doe</div>

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
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 transition-colors duration-300 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            /* Attribution: https://heroicons.com/ */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
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
          <p className="mt-2 text-sm text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        )}
      </div>

      {/* Media */}
      <div id="media" className="px-5 py-3">
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
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 transition-colors duration-300 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            /* Attribution: https://heroicons.com/ */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
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
            <div className="flex flex-row mt-4 space-x-5">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant="contained"
                  onClick={() => setCurrentIndex(index)}
                  className={`${
                    index === currentIndex
                      ? "text-sky-500 bg-sky-100 hover:text-sky-600 hover:bg-sky-100"
                      : "text-gray-400 bg-gray-100 hover:text-sky-600 hover:bg-sky-100"
                  } text-xs normal-case shadow-none hover:shadow-none rounded-2xl transition-colors duration-300 ease-in-out`}
                >
                  {button.name}
                </Button>
              ))}
            </div>

            {/* If the current index is 0, show the media contents, else don't show anything */}
            {currentIndex === 0 && (
              /* Media contents */
              <div id="media-container" className="mt-4 h-[494px] overflow-y-scroll">
                <div className="grid grid-cols-3 grid-rows-3 gap-1">
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
  );
}
