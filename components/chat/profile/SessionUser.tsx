import Image from "next/image";

export default function SessionUser(props: {
  aboutToggle: boolean;
  setAboutToggle: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  profilePicture: string;
  about: string;
}) {
  const { aboutToggle, setAboutToggle, name, profilePicture, about } = props;

  return (
    <>
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

        {aboutToggle && <p className="mt-2 text-sm text-gray-400">{about}</p>}
      </div>
    </>
  );
};