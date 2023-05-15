import { useContext, useState, useRef } from "react";
import axios from "axios";

import ChatContext from "../../ChatContext";
import ProfilePicture from "./ProfilePicture";

export default function Settings() {
  const {
    isMobile,
    sessionUser,
    setSessionUser,
    showComponent,
    setShowComponent,
  } = useContext(ChatContext);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [editingSection, setEditingSection] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

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

        setIsEditing(false);
        setEditingSection("");
      });
  };

  return (
    <div>
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
      <ProfilePicture
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editingSection={editingSection}
        setEditingSection={setEditingSection}
      />

      {/* About */}
      <div className="px-5 py-3 border border-x-0">
        <div className="flex flex-row justify-between">
          <div className="font-medium text-gray-700">About</div>

          {/* If not editing, show edit icon, else show editing icons */}
          {isEditing && editingSection === "about" ? (
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
          ) : (
            /* Attribution: https://heroicons.com/ */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              onClick={() => {
                setIsEditing(true);
                setEditingSection("about");
              }}
              className="w-5 h-5 stroke-blue-500 hover:stroke-blue-700 hover:cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          )}
        </div>

        {/* If not editing display text else display editable textarea */}
        {isEditing && editingSection === "about" ? (
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
        ) : (
          <p className="mt-2 w-full resize-none text-sm text-gray-400  focus:outline-0">
            {sessionUser.about}
          </p>
        )}
      </div>
    </div>
  );
}
