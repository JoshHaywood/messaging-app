import Image from "next/image";

import DefaultProfile from "@/public/images/default-profile.png";

export default function Account() {
  return (
    <>
      <hr className="-mx-5 mt-1 border-t"></hr>

      <div className="flex flex-row items-center my-3 space-x-4 rounded-lg">
        <Image
          src={DefaultProfile}
          alt="User profile picture"
          width={35}
          height={35}
          className="rounded-full border"
        />

        <div className="w-full flex flex- row justify-between">
          <div className="font-medium text-gray-700">John Doe</div>
  
          {/* Attribution: https://heroicons.com/ */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-gray-700 hover:cursor-pointer hover:text-blue-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </div>
      </div>
    </>
  );
};