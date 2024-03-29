import { useState } from "react";

export default function SearchBar(props: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleChange: React.Dispatch<React.ChangeEvent<HTMLInputElement>>;
}) {
  const { searchTerm, setSearchTerm, handleChange } = props;
  const [isFocused, setIsFocused] = useState<boolean>(false); // For input icon focus outline

  return (
    <div className="w-full flex my-5 items-center rounded-xl border">
      {/* Search input */}
      <input
        id="input"
        type="text"
        placeholder="Search chats"
        value={searchTerm}
        onChange={handleChange} // Handle search term change
        onKeyDown={(e) => {
          e.key === "Enter" && setSearchTerm("");
        }}
        onFocus={() => setIsFocused(true)} // On focus add focus outline
        onBlur={() => setIsFocused(false)} // On click outside input remove focus outline
        className="p-2.5 w-full text-sm rounded rounded-r-none focus:outline-none text-gray-400"
      />

      {/* Search icon */}
      <div
        id={`${isFocused && "input-icon"}`} // If input is focused, add focus outline to SVG
        className="py-2.5 rounded rounded-l-none"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          onClick={() => {
            setSearchTerm(""); // Clear search term
            setIsFocused(false); // Remove focus outline
          }}
          className="w-5 h-5 mx-2.5 text-gray-400 hover:text-blue-500 hover:cursor-pointer"
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
}
