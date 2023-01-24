import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Account() {
  const router = useRouter()

  const [name, setName] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");

  // Get user data
  useEffect(() => {
    axios.get("/auth/user").then((res) => {
      // Set user data
      setName(res.data.firstName + " " + res.data.lastName);
      setProfilePicture(res.data.profilePicture);
    });
  }, []);

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
        <img
          src={"../images/" + profilePicture}
          alt="User profile picture"
          width={35}
          height={35}
          className="rounded-full border"
        ></img>

        <div className="w-full flex flex- row justify-between">
          <div className="font-medium text-gray-700">{name}</div>
  
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