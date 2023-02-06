import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

export default function Account(props: {
  welcomeMessage: boolean;
  showProfile: boolean;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAccountSettings: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  profilePicture: string;
  setProfilePicture: React.Dispatch<React.SetStateAction<string>>;
}) {
  const router = useRouter();

  const {
    welcomeMessage,
    showProfile,
    setShowProfile,
    setIsAccountSettings,
    name,
    setName,
    profilePicture,
    setProfilePicture,
  } = props;

  // Logout
  const logoutHandler = () => {
    axios.post("/auth/logout").then((res) => {
      // Clear user data
      setName("");
      setProfilePicture("");

      // Redirect to login page
      router.push("/");
    });
  };

  return (
    <div className="fixed sm:relative bottom-0 sm:bottom-auto left-0 sm:left-auto w-full sm:w-auto px-5 sm:px-0 bg-white">
      <hr className="-mx-2.5 lg:-mx-5 border-t"></hr>

      <div className="flex flex-row items-center my-3 space-x-4 rounded-lg">
        <Image
          src={"/images/" + profilePicture}
          alt="User profile picture"
          width={35}
          height={35}
          onClick={() => {
            {welcomeMessage && setShowProfile(!showProfile)}
            setIsAccountSettings(true);
          }}
          className="rounded-full border hover:cursor-pointer"
        ></Image>

        <div className="w-full flex flex- row justify-between">
          <div
            onClick={() => {
              {welcomeMessage && setShowProfile(!showProfile)}
              setIsAccountSettings(true);
            }}
            className="font-medium text-gray-700 hover:cursor-pointer"
          >
            {name}
          </div>

          {/* Attribution: https://heroicons.com/ */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            onClick={logoutHandler}
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
};