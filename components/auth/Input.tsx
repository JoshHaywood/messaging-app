import { useState } from "react";

export default function Input(props: any) {
  const [passwordShow, setPasswordShow] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  return props.type === "password" ? (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-normal text-gray-600">
        Password
      </label>

      <div className="w-full flex space-x-2.5 items-center">
        <input
          type={passwordShow ? "text" : props.type}
          autoComplete="off"
          placeholder={props.placeholder}
          maxLength={64}
          required
          className="w-full px-3 py-2.5 text-sm leading-tight border rounded-lg focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-500 text-gray-400"
        />

        {/* Attribution: https://fontawesome.com/icons/eye?s=solid&f=classic */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          onClick={togglePassword}
          className="h-3 w-3 fill-gray-600 hover:cursor-pointer hover:fill-blue-600"
        >
          <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z" />
        </svg>
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
        className="w-full px-3 py-2.5 mb-3 text-sm leading-tight border rounded-lg focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-500 text-gray-400"
      />
    </div>
  );
};