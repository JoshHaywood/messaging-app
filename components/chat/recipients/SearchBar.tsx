import { useState } from "react";

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full flex mt-5 items-center rounded-xl border">
      <input
        id="input"
        type="text"
        placeholder="Search chats"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="p-2.5 w-full text-sm rounded rounded-r-none focus:outline-none text-gray-400"
      />

      <div
        id={`${isFocused && "inputIcon"}`}
        className="py-2.5 rounded rounded-l-none"
      >
        {/* Attribution to https://heroicons.com/ */}
        <svg
          className="w-5 h-5 mx-2.5 text-gray-400 hover:text-blue-500 hover:cursor-pointer"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
    </div>
  );
};