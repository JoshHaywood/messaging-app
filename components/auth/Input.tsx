import { useState } from "react";

interface Input {
  label: string;
  type: string;
  placeholder: string;
  setState: (value: string) => void;
  error: string;
};

export default function Input(props: Input) {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Password toggle handler
  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  return props.type === "password" ? (
    <div className="mb-8">
      <label className="block mb-2 text-sm font-normal text-gray-600">
        {props.label}
      </label>

      <div className="w-full flex items-center">
        <input
          type={passwordShow ? "text" : props.type}
          autoComplete="off"
          placeholder={props.placeholder}
          maxLength={64}
          required
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {props.setState(e.target.value)}}
          className={`${props.error ? "border-red-500 rounded" : "border-gray-200"} w-full px-3 py-2.5 text-sm leading-tight border border-r-0 rounded-lg rounded-r-none focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-500 text-gray-400`}
        />

        {/* If password is shown, show the eye icon, else show the hide icon */}
        {passwordShow ? (
          <div
            id={`${isFocused && "input-icon"}`}
            className="p-3 border rounded-r-lg bg-gray-100"
          >
            {/* Attribution: https://fontawesome.com/icons/eye?s=solid&f=classic */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              onClick={togglePassword}
              className="h-3.5 w-3.5 fill-gray-600 hover:cursor-pointer"
            >
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z" />
            </svg>
          </div>
        ) : (
          <div
            id={`${isFocused && "input-icon"}`}
            className="p-3 border rounded-r-lg bg-gray-100"
          >
            {/* Attribution: https://fontawesome.com/icons/eye-slash?s=solid&f=classic */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              onClick={togglePassword}
              className="h-3.5 w-3.5 fill-gray-600 hover:cursor-pointer"
            >
              <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c5.2-11.8 8-24.8 8-38.5c0-53-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zm223.1 298L373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="mb-4">
      <label className="container block mb-2 text-sm font-normal text-gray-600">
        {props.label}
      </label>

      <input
        type={props.type}
        autoComplete="off"
        placeholder={props.placeholder}
        required
        maxLength={50}
        onChange={(e) => {props.setState(e.target.value)}}
        className={`${props.error ? "border-red-500 rounded" : "border-gray-200"} w-full px-3 py-2.5 mb-3 text-sm leading-tight border rounded-lg focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-500 text-gray-400`}
      />
    </div>
  );
};