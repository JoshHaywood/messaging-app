import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

import { ContainsCapital, ContainsNumber, ContainsSpecial } from "@/components/auth/inputFormatter";
import Input from "@/components/auth/Input";
import ErrorMessage from "@/components/auth/ErrorMessage";
import Button from "@mui/material/Button";

export default function Register() {
  const [userName, setUserName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [error, setError] = useState<string>("");

  const router = useRouter();

  const insertRow = () => {
    // Insert users into database
    axios.post("/auth/register", {
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    })
    .then((res) => {
      setError(res.data);

      // If validation passed
      if (res.data === 'Successfully registered, please login') {
        router.push({ pathname: '/', query: { message: res.data }}, '/');
      };
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // // If first or last name contain numbers or special characters
    if (ContainsNumber(firstName) || ContainsSpecial(firstName) || ContainsNumber(lastName) || ContainsSpecial(lastName)) {
      return setError("Names may only contain alphabetic characters");    
    };

    // If password doesn't contain a capital
    if (!ContainsCapital(password)) {
      return setError("Password must contain at least one uppercase letter");
    };

    // If password doesn't contain a number
    if (!ContainsNumber(password)) {
      return setError("Password must contain at least one number");
    };

    // If password is less than 8 characters
    if (password.length < 8) {
      return setError("Password must be at least 8 characters long");
    };

    // If passwords don't match
    if (confirmPassword !== password) {
      return setError("Passwords do not match");
    };

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
            onKeyDown={(e) => {
              e.key === 'Enter' && submitHandler; //Submit form on enter
            }}
            className="sm:w-[400px] py-8"
          >
            {/* Username */}
            <Input
              label="Username"
              type="text"
              placeholder="Username"
              setState={setUserName}
              error={error === "Username already exists" ? error : ""}
            />

            <ErrorMessage error={error === "Username already exists" ? error : ""} />

            {/* Names row */}
            <div className="sm:flex sm:justify-between">
              {/* First name */}
              <Input
                label="First name"
                type="text"
                placeholder="John"
                setState={setFirstName}
                error={error === "Names may only contain alphabetic characters" ? error : ""}
                />

              {/* Last name */}
              <Input
                label="Last name"
                type="text"
                placeholder="Doe"
                setState={setLastName}
                error={error === "Names may only contain alphabetic characters" ? error : ""}
                />
            </div>

            <ErrorMessage error={error === "Names may only contain alphabetic characters" ? error : ""} />

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              placeholder="email@email.com"
              setState={setEmail}
              error={error === "Email already exists" ? error : ""}
            />

            <ErrorMessage error={error === "Email already exists" ? error : ""} />

            {/* Password */}
            <Input 
              label="Password" 
              type="password" 
              placeholder="Password123" 
              setState={setPassword}
              error={error === "Password must contain at least one uppercase letter" || error === "Password must contain at least one number" || error === "Password must be at least 8 characters long" ? error : ""}
            />

            {/* Confirm password */}
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Password123"
              setState={setConfirmPassword}
              error={error === "Passwords do not match" ? error : ""}
            />

            <ErrorMessage 
              error={
                error === "Password must contain at least one uppercase letter" ||
                error === "Password must contain at least one number" || 
                error === "Password must be at least 8 characters long" 
                  ? error 
                  : ""
              } 
            />

            {/* Submit button */}
            <div className="mb-6 mt-10 text-center">
              <Button
                type="submit"
                variant="contained"
                className="w-full rounded-lg normal-case bg-blue-500"
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