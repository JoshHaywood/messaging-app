import Image from "next/image";

import Contact from "@/interfaces/contact";

export default function PendingContacts(props: { pendingContacts: Contact[] }) {
  const { pendingContacts } = props;

  return (
    <>
      {pendingContacts.map((contact, index) => (
        <div
          key={index}
          className="mb-2.5 px-1 lg:px-2.5 flex flex-row items-center py-2 space-x-4 rounded-lg"
        >
          {/* Profile picture */}
          <Image
            src={contact.sender_picture}
            alt="User profile picture"
            width={45}
            height={45}
            className="aspect-square rounded-full border"
          />

          <div className="w-full">
            {/* Name and username */}
            <div className="relative flex flex-row justify-between">
              <div>
                <div className="text-gray-700">{contact.sender_name}</div>

                <div className="text-sm font-medium text-gray-300">
                  {contact.sender}
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
    </>
  );
}
