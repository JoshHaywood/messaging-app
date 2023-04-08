import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

import User from "@/interfaces/user";
import SessionUser from "@/interfaces/sessionUser";
import ShowComponent from "@/interfaces/showComponent";
import Message from "@/interfaces/message";

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

export default function Contact(props: {
  isMobile: boolean;
  sessionUser: SessionUser;
  contact: User[];
  showComponent: ShowComponent;
  setShowComponent: React.Dispatch<React.SetStateAction<ShowComponent>>;
  aboutToggle: boolean;
  setAboutToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    isMobile,
    sessionUser,
    contact,
    showComponent,
    setShowComponent,
    aboutToggle,
    setAboutToggle,
  } = props;

  const [showMedia, setShowMedia] = useState<boolean>(true); // Toggle media section
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Current index of media content

  const [media, setMedia] = useState<Message[]>([]); // Images from recipient to sender

  // Get images from recipient to sender
  useEffect(() => {
    axios.get("/message/get/images", {
      params: { 
        sender: sessionUser.name,
        recipient: contact[0].first_name + " " + contact[0].last_name,
      },
    }).then((res) => {
      setMedia(res.data);
    });
  }, [sessionUser.name, contact]);

  return (
    <>
      {/* Back button */}
      {/* If is mobile, show back button */}
      {isMobile && (
        <div
          id="close-profile"
          onClick={() => {
            // Hide messages and profile to show chat list
            setShowComponent(({
              ...showComponent,
              showMessages: true,
              showProfile: false,
            }));
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

      {/* Contact profile */}
      {contact.map((contact, index) => (
        <div key={index} id="media-container" className="overflow-y-auto">
          {/* Profile picture */}
          <div className="mx-auto p-5 text-center">
            <Image
              src={"/images/" + contact.profile_picture}
              alt="User profile picture"
              width={125}
              height={125}
              className="mx-auto rounded-full border"
            />

            <div className="mt-4 text-xl font-medium text-gray-700">
              {contact.first_name + " " + contact.last_name}
            </div>

            <div className="mt-1 text-xs text-green-400">Online</div>
          </div>

          {/* About */}
          <div
            id="about"
            // Toggle about on click
            onClick={() => setAboutToggle(!aboutToggle)}
            className="mt-4 px-5 py-3 border border-x-0 hover:cursor-pointer"
          >
            <div className="flex flex-row justify-between">
              <div className="font-medium text-gray-700 hover:cursor-pointer">
                About
              </div>

              {/* If about is true, show the up arrow, else show the down arrow */}
              {aboutToggle ? (
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

            {/* If about is true, show the about text */}
            {aboutToggle && (
              <p className="mt-2 text-sm text-gray-400">{contact.about}</p>
            )}
          </div>

          {/* Media */}
          <div
            id="media"
            className={`${showMedia ? "border-0" : "border-b"} px-5 py-3`}
          >
            <div
              onClick={() => setShowMedia(!showMedia)}
              className="flex flex-row justify-between hover:cursor-pointer"
            >
              <div className="font-medium text-gray-700">
                Media. Files and Links
              </div>

              {/* If media is true, show the up arrow, else show the down arrow */}
              {showMedia ? (
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
            {showMedia && (
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
                  <div className="mt-4 pr-1">
                      {/* If there is no media, show text, else show the media */}
                      {media.length === 0 ? (
                        <div className="mt-5 text-sm sm:text-xs italic text-gray-400">Images your sent will appear here</div>
                      ) : (
                        <div className="grid grid-cols-2 2xl:grid-cols-3 gap-1">
                          {media.map((media, index) => (
                            media.image !== null && (
                              <Image
                                key={index}
                                src={media.image}
                                alt="Chat media"
                                width={120}
                                height={120}
                                className="w-full h-auto rounded"
                              />
                            )
                          ))}
                      </div>
                      )} 
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