import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

import Input from "../components/auth/Input";
import Button from "@mui/material/Button";

export default function Register() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const insertRow = () => {
    // Insert users into database
    axios.post("/auth/register", {
      userName: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    })
    .then((res) => {
      console.log(res);
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    insertRow();
  };

  return (
    <>
      <Head>
        <title>ChatHub | Register</title>
      </Head>

      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-full sm:w-auto flex flex-col justify-center mx-5 sm:mx-0 p-5 sm:p-12 shadow-lg bg-white">
          {/* Heading */}
          <h1 className="mb-3 text-center font-bold text-3xl tracking-wide text-black">
            Sign Up
          </h1>

          <div className="text-center tracking-wide text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  className="inline-block text-sm text-cyan-1000 align-baseline text-blue-500 hover:text-blue-700 hover:underline"
                  href="/"
                >
                  Sign in here.
                </Link>
              </div>

          {/* Registration form */}
          <form 
            onSubmit={submitHandler} 
            className="sm:w-[400px] py-8"
          >
            {/* Username */}
            <Input
              label="Username"
              type="text"
              placeholder="Username"
              setState={setUsername}
            />

            {/* Names row */}
            <div className="sm:flex sm:justify-between">
              {/* First name */}
              <Input
                label="First name"
                type="text"
                placeholder="John"
                setState={setFirstName}
              />

              {/* Last name */}
              <Input
                label="Last name"
                type="text"
                placeholder="Doe"
                setState={setLastName}
              />
            </div>

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              placeholder="email@email.com"
              setState={setEmail}
            />

            {/* Password */}
            <Input 
              label="Password" 
              type="password" 
              placeholder="Password123" 
              setState={setPassword}
            />

            {/* Confirm password */}
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Password123"
              setState={setConfirmPassword}
            />

            {/* Submit button */}
            <div className="mb-6 mt-10 text-center">
              <Button
                type="submit"
                variant="contained"
                className="w-full py-1.5rem rounded-lg normal-case bg-blue-500"
              >
                Sign in
              </Button>
            </div>

            {/* Registration link */}
            <hr className="border-t" />
          </form>
        </div>
      </div>
    </>
  );
};