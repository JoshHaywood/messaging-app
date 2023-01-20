import Head from "next/head";
import Link from "next/link";

import Input from "../components/auth/Input";
import Button from "@mui/material/Button";

export default function Register() {
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
          <form className="sm:w-[400px] py-8">
            {/* Username */}
            <Input
              label="Username"
              type="text"
              placeholder="Username"
            />

            {/* Names row */}
            <div className="sm:flex sm:justify-between">
              {/* First name */}
              <Input
                label="First name"
                type="text"
                placeholder="John"
              />

              {/* Last name */}
              <Input
                label="Last name"
                type="text"
                placeholder="Doe"
              />
            </div>

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              placeholder="email@email.com"
            />

            {/* Password */}
            <Input 
              label="Password" 
              type="password" 
              placeholder="Password123" 
            />

            {/* Confirm password */}
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Password123"
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