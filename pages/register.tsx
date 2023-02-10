import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

import Input from "@/components/auth/Input";
import ErrorMessage from "@/components/auth/ErrorMessage";
import Button from "@mui/material/Button";

import useFormData from "@/components/auth/useFormData";
import { ContainsCapital, ContainsNumber, ContainsSpecial } from "@/components/auth/inputFormatter";

export default function Register() {
  const router = useRouter();

  const { formData, handleChange } = useFormData(); // Form data state
  const [error, setError] = useState<string>(""); // Error state

  // Register user
  const insertRow = () => {
    // Insert users into database
    axios.post("/auth/register", {
      userName: formData.userName,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
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
    e.preventDefault(); // Prevent page refresh
    setError(""); // Clear error

    // // If first or last name contain numbers or special characters
    if (ContainsNumber(formData.firstName) || ContainsSpecial(formData.firstName) || ContainsNumber(formData.lastName) || ContainsSpecial(formData.lastName)) {
      return setError("Names may only contain alphabetic characters");    
    };

    // If password doesn't contain a capital
    if (!ContainsCapital(formData.password)) {
      return setError("Password must contain at least one uppercase letter");
    };

    // If password doesn't contain a number
    if (!ContainsNumber(formData.password)) {
      return setError("Password must contain at least one number");
    };

    // If password is less than 8 characters
    if (formData.password.length < 8) {
      return setError("Password must be at least 8 characters long");
    };

    // If passwords don't match
    if (formData.confirmPassword !== formData.password) {
      return setError("Passwords do not match");
    };

    insertRow(); // Insert user into database
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
              name="userName"
              placeholder="Username"
              value={formData.userName}
              handleChange={handleChange}
              error={error === "Username already exists" ? error : ""}
            />

            <ErrorMessage error={error === "Username already exists" ? error : ""} />

            {/* Names row */}
            <div className="sm:flex sm:justify-between">
              {/* First name */}
              <Input
                label="First name"
                type="text"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                handleChange={handleChange}
                error={error === "Names may only contain alphabetic characters" ? error : ""}
                />

              {/* Last name */}
              <Input
                label="Last name"
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                handleChange={handleChange}
                error={error === "Names may only contain alphabetic characters" ? error : ""}
                />
            </div>

            <ErrorMessage error={error === "Names may only contain alphabetic characters" ? error : ""} />

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="email@email.com"
              value={formData.email}
              handleChange={handleChange}
              error={error === "Email already exists" ? error : ""}
            />

            <ErrorMessage error={error === "Email already exists" ? error : ""} />

            {/* Password */}
            <Input 
              label="Password" 
              type="password" 
              name="password"
              placeholder="Password123" 
              value={formData.password}
              handleChange={handleChange}
              error={error === "Password must contain at least one uppercase letter" || error === "Password must contain at least one number" || error === "Password must be at least 8 characters long" ? error : ""}
            />

            {/* Confirm password */}
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Password123"
              value={formData.confirmPassword}
              handleChange={handleChange}
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
                sx={{
                  width: "100%",
                  margin: "0 auto",
                  borderRadius: "0.5rem",
                  textTransform: "none",
                  color: "#fff",
                }}
                className="bg-blue-500 hover:bg-blue-600" // MUI background color bug workaround
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