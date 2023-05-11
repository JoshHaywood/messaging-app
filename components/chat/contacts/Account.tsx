import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import SessionUser from "@/interfaces/sessionUserTypes";
import ShowComponentTypes from "@/interfaces/showComponentTypes";

export default function Account(props: {
  isMobile: boolean;
  sessionUser: SessionUser;
  setSessionUser: React.Dispatch<React.SetStateAction<SessionUser>>;
  showComponentTypes: ShowComponentTypes;
  setShowComponent: React.Dispatch<React.SetStateAction<ShowComponentTypes>>;
}) {
  const router = useRouter();

  const {
    isMobile,
    sessionUser,
    setSessionUser,
    showComponentTypes,
    setShowComponent,
  } = props;

  // Logout
  const logoutHandler = () => {
    axios.post("/auth/logout").then((res) => {
      // Clear user data
      setSessionUser({
        name: "",
        userName: "",
        about: "",
        profilePicture: "",
      });

      // Redirect to login page
      router.push("/");
    });
  };

  return (
    <div className="fixed sm:relative bottom-0 sm:bottom-auto left-0 sm:left-auto w-full sm:w-auto px-5 sm:px-0 bg-white">
      {/* Top bar */}
      <hr className="-mx-2.5 lg:-mx-5 border-t"></hr>

      {/* User profile */}
      <div className="flex flex-row items-center my-3 space-x-4 rounded-lg">
        {/* Profile picture */}
        {sessionUser.profilePicture && (
          <Image
            src={sessionUser.profilePicture}
            alt="User profile picture"
            width={35}
            height={35}
            onClick={() => {
              // If mobile, close messages and open settings, else open settings
              {
                isMobile
                  ? setShowComponent({
                      ...showComponentTypes,
                      showProfile: true,
                      showMessages: false,
                      isAccountSettings: true,
                    })
                  : setShowComponent({
                      ...showComponentTypes,
                      showProfile: true,
                      isAccountSettings: true,
                    });
              }
              // If welcome message is showing, toggle profile
              {
                showComponentTypes.welcomeMessage &&
                  setShowComponent({
                    ...showComponentTypes,
                    showProfile: !showComponentTypes.showProfile,
                    isAccountSettings: true,
                  });
              }
            }}
            className="aspect-square rounded-full border hover:cursor-pointer"
          />
        )}

        {/* Account information */}
        <div className="w-full flex flex- row justify-between">
          <div
            onClick={() => {
              // If mobile, close messages and open profile
              {
                isMobile &&
                  setShowComponent({
                    ...showComponentTypes,
                    showMessages: false,
                    showProfile: true,
                  });
              }
              // If welcome message is showing, toggle profile
              {
                showComponentTypes.welcomeMessage &&
                  setShowComponent({
                    ...showComponentTypes,
                    showProfile: !showComponentTypes.showProfile,
                  });
              }
              // Revert to recipient profile instead of account settings
              setShowComponent({
                ...showComponentTypes,
                isAccountSettings: true,
              });
            }}
            className="font-medium text-gray-700 hover:cursor-pointer"
          >
            {sessionUser.name}
          </div>

          {/* Logout button */}
          {/* Attribution: https://heroicons.com/ */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            onClick={logoutHandler} // On click, logout
            className="w-6 h-6 text-gray-700 hover:cursor-pointer hover:text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
