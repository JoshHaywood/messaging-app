import Image from "next/image";

export default function SessionUser(props: {
  isMobile: boolean;
  welcomeMessage: boolean;
  showProfile: boolean;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAccountSettings: React.Dispatch<React.SetStateAction<boolean>>;
  aboutToggle: boolean;
  setAboutToggle: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  profilePicture: string;
  about: string;
}) {
  const {
    isMobile,
    welcomeMessage,
    showProfile,
    setShowProfile,
    setIsAccountSettings,
    aboutToggle,
    setAboutToggle,
    name,
    profilePicture,
    about,
  } = props;

  return (
    <>
      {/* Back button */}
      <div
        id="close-profile"
        onClick={() => {
          {isMobile && setShowProfile(false)} // If mobile, close profile
          {welcomeMessage && setShowProfile(!showProfile)} // If welcome message is showing, toggle profile
          setIsAccountSettings(false); // Revert to recipient profile instead of account settings
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
          src={"/images/" + profilePicture}
          alt="User profile picture"
          width={125}
          height={125}
          className="mx-auto rounded-full border"
        ></Image>

        <div className="mt-4 text-xl font-medium text-gray-700">{name}</div>

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
        {aboutToggle && <p className="mt-2 text-sm text-gray-400">{about}</p>}
      </div>
    </>
  );
};