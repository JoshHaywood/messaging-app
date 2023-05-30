import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

import ChatContext from "@/components/chat/ChatContext";
import Message from "@/interfaces/message";

import { Squash as Hamburger } from "hamburger-react";
import Button from "@mui/material/Button";

interface Sections {
  about: boolean;
  media: boolean;
  links: boolean;
}

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

export default function Contact() {
  const { isMobile, sessionUser, contact, showComponent, setShowComponent } =
    useContext(ChatContext);

  const [showMenu, setShowMenu] = useState<boolean>(false); // Toggle menu

  const [showSection, setShowSection] = useState<Sections>({
    about: false,
    media: true,
    links: false,
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0); // Current index of media content

  const [media, setMedia] = useState<Message[]>([]); // Images from recipient to sender
  const [links, setLinks] = useState<Message[]>([]); // Links from recipient to sender

  // Get images from recipient to sender
  useEffect(() => {
    axios
      .get("/message/get/images", {
        params: {
          sender: sessionUser.name,
          recipient: contact[0].first_name + " " + contact[0].last_name,
        },
      })
      .then((res) => {
        setMedia(res.data);
      });
  }, [sessionUser.name, contact]);

  // Get links from recipient to sender
  useEffect(() => {
    axios
      .get("/message/get/links", {
        params: {
          sender: sessionUser.name,
          recipient: contact[0].first_name + " " + contact[0].last_name,
        },
      })
      .then((res) => {
        setLinks(res.data);
      });
  }, [sessionUser.name, contact]);

  // Remove contact
  const removeContact = () => {
    const encodedContact = encodeURIComponent(contact[0].user_name); // Encode sender as it contains special characters

    // Delete contact from contacts table
    axios.delete(`/contacts/remove/${encodedContact}`).then((res) => {
      // If successful, reload page
      if (res.data === "Contact removed") {
        window.location.reload();
      }
    });
  };

  return (
    <>
      {/* Back button */}
      {/* If is mobile, show back button */}
      {isMobile && (
        <div
          id="close-profile"
          onClick={() => {
            // Hide messages and profile to show chat list
            setShowComponent({
              ...showComponent,
              showMessages: true,
              showProfile: false,
            });
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
        <div
          key={index}
          id="media-container"
          className="relative overflow-y-auto"
        >
          <div className="absolute top-2.5 right-2.5">
            {showMenu && (
              <>
                <div className="relative">
                  <div
                    onClick={removeContact}
                    className="absolute whitespace-nowrap z-20 top-10 right-1.5 p-1 bg-gray-100 border hover:cursor-pointer"
                  >
                    Delete contact
                  </div>

                  <div
                    onClick={() => setShowMenu(false)}
                    className="z-10 fixed inset-0"
                  ></div>
                </div>
              </>
            )}

            <div className="hover:cursor-pointer">
              <Hamburger
                toggled={showMenu}
                toggle={setShowMenu}
                size={18}
                easing="ease-in-out"
                rounded
              />
            </div>
          </div>

          {/* Profile picture */}
          <div className="mx-auto p-5 text-center">
            <Image
              src={contact.profile_picture}
              alt="User profile picture"
              width={125}
              height={125}
              className="aspect-square mx-auto rounded-full border"
            />

            <div className="mt-4 text-xl font-medium text-gray-700">
              {contact.first_name + " " + contact.last_name}
            </div>

            <div className="mt-1 text-xs text-green-400">Online</div>
          </div>

          {/* About */}
          <div
            // Toggle about on click
            onClick={() =>
              setShowSection({ ...showSection, about: !showSection.about })
            }
            className="mt-4 px-5 py-3 border border-x-0 hover:cursor-pointer"
          >
            <div className="flex flex-row justify-between">
              <div className="font-medium text-gray-700 hover:cursor-pointer">
                About
              </div>

              {/* If about is true, show the up arrow, else show the down arrow */}
              {showSection.about ? (
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
            {showSection.about && (
              <p className="mt-2 text-sm text-gray-400">{contact.about}</p>
            )}
          </div>

          {/* Sections */}
          <div
            className={`${
              showSection.media ? "border-0" : "border-b"
            } px-5 py-3`}
          >
            <div
              onClick={() =>
                setShowSection({ ...showSection, media: !showSection.media })
              }
              className="flex flex-row justify-between hover:cursor-pointer"
            >
              <div className="font-medium text-gray-700">
                Media. Files and Links
              </div>

              {/* If media is true, show the up arrow, else show the down arrow */}
              {showSection.media ? (
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
            {showSection.media && (
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

                {/* If the current index is 0, show the media */}
                {currentIndex === 0 && (
                  /* Media contents */
                  <div className="mt-4 pr-1">
                    {/* If there is no media, show text, else show the media */}
                    {media.length === 0 ? (
                      <div className="mt-5 text-sm sm:text-xs italic text-gray-400">
                        Images your sent will appear here
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 2xl:grid-cols-3 gap-1">
                        {media.map(
                          (media, index) =>
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
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* If the current index is 1, show links */}
                {currentIndex === 1 && (
                  /* Media contents */
                  <div className="mt-4 pr-1">
                    {/* If there is no media, show text, else show the media */}
                    {links.length === 0 ? (
                      <div className="mt-5 text-sm sm:text-xs italic text-[#e0f2fe]">
                        Links your sent will appear here
                      </div>
                    ) : (
                      <div className="mt-5 flex flex-col">
                        {links.map(
                          (link, index) =>
                            link.message !== null && (
                              <a
                                key={index}
                                href={link.message}
                                className="mb-2.5 text-xs text-gray-400 underline hover:text-sky-500"
                              >
                                {link.message}
                              </a>
                            )
                        )}
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
}
