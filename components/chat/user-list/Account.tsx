import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import User from "@/interfaces/user";

export default function Account(props: {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  profilePicture: string;
  setProfilePicture: React.Dispatch<React.SetStateAction<string>>;
  welcomeMessage: boolean;
  showProfile: boolean;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setProfile: React.Dispatch<React.SetStateAction<User[]>>;
}) {
  const router = useRouter();

  const {
    setProfile,
    name,
    setName,
    profilePicture,
    setProfilePicture,
    welcomeMessage,
    showProfile,
    setShowProfile,
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
    <>
      <hr className="-mx-5 mt-1 border-t"></hr>

      <div className="flex flex-row items-center my-3 space-x-4 rounded-lg">
        <Image
          src={"/images/" + profilePicture}
          alt="User profile picture"
          width={35}
          height={35}
          onClick={() => {
            setProfile([]);
            {welcomeMessage && setShowProfile(!showProfile)}
          }}
          className="rounded-full border hover:cursor-pointer"
        ></Image>

        <div className="w-full flex flex- row justify-between">
          <div
            onClick={() => {
              setProfile([]);
              {welcomeMessage && setShowProfile(!showProfile)}
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
    </>
  );
};