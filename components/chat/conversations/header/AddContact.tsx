import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

import ErrorMessage from "@/components/auth/ErrorMessage";
import Button from "@mui/material/Button";

export default function AddContact() {
  const isSmallMobile = useMediaQuery({ query: "(max-width: 475px)" });
  const [showModel, setShowModel] = useState(false);

  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Register user
  const insertRow = () => {
    axios
      .post("/contacts/request", {
        recipient: username,
      })
      .then((res) => {
        setError(res.data);

        if (res.data === "Contact request sent") {
          setError("");
          setShowModel(false);
          return;
        }
      });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // If username doesnt contain # and 4 digits
    if (!username.match(/#\d{4}/)) {
      return setError("Username must contain # and 4 digits");
    }

    insertRow();
  };

  return (
    <>
      {/* Attribution: https://heroicons.com/ */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        onClick={() => setShowModel(true)}
        className="w-10 h-10 p-1.5 border rounded-lg stroke-gray-500 hover:stroke-gray-700 hover:cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
        />
      </svg>

      {/* Add contact modal */}
      {showModel && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div
            onClick={() => {
              setShowModel(false);
              setError("");
            }}
            className="fixed inset-0 bg-gray-800 opacity-75"
          ></div>

          <div className="relative w-full sm:w-[800px] rounded border z-10 bg-white mr-2 md:mr-0 p-5">
            {/* Close button */}
            {/* Attribution: https://heroicons.com/ */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              onClick={() => {
                setShowModel(false);
                setError("");
              }}
              className="w-6 h-6 absolute top-5 right-5 text-gray-700 hover:text-black hover:cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>

            <div className="font-bold text-2xl text-gray-700">Add Contact</div>

            <p className="mt-2 text-sm text-gray-500">
              Add a contact using their unique username ID. This can be found
              under their profile picture.
            </p>

            {isSmallMobile ? (
              <div className="mt-5">
                <input
                  placeholder="Enter a Username#0000"
                  required
                  className="p-2 w-full justify-between border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                />

                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    marginTop: "1.25rem",
                    textTransform: "none",
                    fontSize: "0.75rem",
                    borderRadius: "0.25rem",
                    color: "#fff",
                  }}
                  className="bg-blue-500 hover:bg-blue-600" // MUI background color bug workaround
                >
                  Add contact
                </Button>

                <ErrorMessage error={error ? error : ""} />
              </div>
            ) : (
              <>
                <form
                  id="add-contact-container"
                  onSubmit={submitHandler}
                  onKeyDown={(e) => {
                    e.key === "Enter" && submitHandler; //Submit form on enter
                  }}
                  className={`mt-5 ${
                    error && "mb-8"
                  } flex flex-row justify-between border rounded-lg `}
                >
                  <input
                    placeholder="Enter a Username#0000"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className="px-2 w-2/3 lg:w-3/4 text-gray-500 focus:outline-none"
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      margin: "0.5rem",
                      textTransform: "none",
                      fontSize: "0.75rem",
                      borderRadius: "0.25rem",
                      color: "#fff",
                    }}
                    className="bg-blue-500 hover:bg-blue-600" // MUI background color bug workaround
                  >
                    Add contact
                  </Button>
                </form>

                <ErrorMessage error={error ? error : ""} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
