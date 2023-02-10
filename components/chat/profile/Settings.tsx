import Image from "next/image";

import SessionUser from "@/interfaces/sessionUser";
import ShowComponent from "@/interfaces/showComponent";

export default function Settings(props: {
  isMobile: boolean;
  sessionUser: SessionUser;
  showComponent: ShowComponent;
  setShowComponent: React.Dispatch<React.SetStateAction<ShowComponent>>;
  aboutToggle: boolean;
  setAboutToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    isMobile,
    showComponent,
    setShowComponent,
    sessionUser,
    aboutToggle,
    setAboutToggle,
  } = props;

  return (
    <>
      {/* Back button */}
      <div
        id="close-profile"
        onClick={() => {
          // If mobile, close profile
          {isMobile ? setShowComponent(({
            ...showComponent, showProfile: false
          })) : setShowComponent(({
            ...showComponent, isAccountSettings: false
          }))}
          // If welcome message is showing, toggle profile
          {showComponent.welcomeMessage && setShowComponent(({
            ...showComponent,
            showProfile: !showComponent.showProfile, isAccountSettings: true,
          }))};
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
        <Image
          src={"/images/" + sessionUser.profilePicture}
          alt="User profile picture"
          width={125}
          height={125}
          className="mx-auto rounded-full border"
        />

        <div className="mt-4 text-xl font-medium text-gray-700">{sessionUser.name}</div>

        <div className="mt-1 text-xs text-green-400">Online</div>
      </div>

      {/* About */}
      <div
        id="about"
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
        {aboutToggle && <p className="mt-2 text-sm text-gray-400">{sessionUser.about}</p>}
      </div>
    </>
  );
};