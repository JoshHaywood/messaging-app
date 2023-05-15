import Image from "next/image";
import User from "@/interfaces/user";

export default function PendingContacts(props: { usersArray: User[] }) {
  const { usersArray } = props;

  return (
    <div
      id="users-container"
      className="h-full overflow-y-scroll mb-5 lg:mb-2.5 xl:mb-5 -mr-1.5 lg:-mr-3.5 pr-1 lg:pr-2"
    >
      {usersArray.map((user, index) => (
        <div
          key={index}
          className="mb-2.5 px-1 lg:px-2.5 flex flex-row items-center py-2 space-x-4 rounded-lg"
        >
          {/* Profile picture */}
          <Image
            src={user.profile_picture}
            alt="User profile picture"
            width={45}
            height={45}
            className="aspect-square rounded-full border"
          />

          <div className="w-full">
            {/* Name and username */}
            <div className="relative flex flex-row justify-between">
              <div>
                <div className="text-gray-700">
                  {user.first_name + " " + user.last_name}
                </div>

                <div className="text-sm font-medium text-gray-300">
                  {user.user_name}
                </div>
              </div>

              {/* Accept or decline icons */}
              <div className="flex flex-row items-center space-x-2.5">
                {/* Attribution: https://heroicons.com/ */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 stroke-gray-700 hover:stroke-blue-500 hover:cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>

                {/* Attribution: https://heroicons.com/ */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 stroke-gray-700 hover:stroke-blue-500 hover:cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
