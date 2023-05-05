import Image from "next/image";
import { useState, useRef } from "react";
import axios from "axios";

import SessionUser from "@/interfaces/sessionUser";
import ShowComponent from "@/interfaces/showComponent";
import createFileInputHandler from "@/components/utils/createFileInputHandler";

export default function Settings(props: {
  isMobile: boolean;
  sessionUser: SessionUser;
  setSessionUser: React.Dispatch<React.SetStateAction<SessionUser>>;
  showComponent: ShowComponent;
  setShowComponent: React.Dispatch<React.SetStateAction<ShowComponent>>;
}) {
  const {
    isMobile,
    sessionUser,
    setSessionUser,
    showComponent,
    setShowComponent,
  } = props;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Change profile picture handler
  const handleProfilePicture = createFileInputHandler((result) => {
    axios
      .put(`/settings/profile_picture`, {
        value: result,
      })
      .then((res) => {
        setSessionUser({
          ...sessionUser,
          profilePicture: res.data,
        });
      });
  });

  // Edit button handler
  const handleEdit = () => {
    axios
      .put(`/settings/about`, {
        value: textareaRef.current?.value,
      })
      .then((res) => {
        setSessionUser({
          ...sessionUser,
          about: res.data,
        });
      });

    setIsEditing(false);
  };

  return (
    <>
      {/* Back button */}
      <div
        id="close-profile"
        onClick={() => {
          // If mobile, close profile
          {
            isMobile
              ? setShowComponent({
                  ...showComponent,
                  showProfile: false,
                })
              : setShowComponent({
                  ...showComponent,
                  isAccountSettings: false,
                });
          }
          // If welcome message is showing, toggle profile
          {
            showComponent.welcomeMessage &&
              setShowComponent({
                ...showComponent,
                showProfile: !showComponent.showProfile,
                isAccountSettings: true,
              });
          }
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

      {/* Profile picture */}
      <div className="mx-auto p-5 text-center">
        <div className="relative">
          <Image
            src={sessionUser.profilePicture}
            alt="User profile picture"
            width={125}
            height={125}
            className="mx-auto rounded-full border"
          />

          {/* Attribution: https://heroicons.com/ */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            onClick={handleProfilePicture}
            className="w-8 h-8 absolute bottom-1 right-1 p-1 rounded-full bg-blue-500 hover:bg-blue-700 fill-white stroke-blue-500 hover:cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
            />
          </svg>
        </div>

        <div className="mt-4 text-xl font-medium text-gray-700">
          {sessionUser.name}
        </div>

        <div className="mt-1 text-xs text-green-400">Online</div>
      </div>

      {/* About */}
      <div className="mt-4 px-5 py-3 border border-x-0">
        <div className="flex flex-row justify-between">
          <div className="font-medium text-gray-700">About</div>

          {/* If not editing, show edit icon, else show editing icons */}
          {!isEditing ? (
            /* Attribution: https://heroicons.com/ */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              onClick={() => setIsEditing(true)}
              className="w-5 h-5 stroke-blue-500 hover:stroke-blue-700 hover:cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          ) : (
            <div className="flex flex-row">
              {/* Attribution: https://heroicons.com/ */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                onClick={() => handleEdit()}
                className=" w-6 h-6 stroke-blue-500 hover:stroke-blue-700 hover:cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
          )}
        </div>

        {/* If not editing display text else display editable textarea */}
        {!isEditing ? (
          <p className="mt-2 w-full resize-none text-sm text-gray-400  focus:outline-0">
            {sessionUser.about}
          </p>
        ) : (
          <textarea
            rows={5}
            maxLength={150}
            defaultValue={sessionUser.about}
            ref={textareaRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEdit();
              }
            }}
            className="mt-2 w-full resize-none text-sm text-gray-400 border-b border-blue-500 focus:outline-0"
          />
        )}
      </div>
    </>
  );
};