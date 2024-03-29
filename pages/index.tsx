import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

import Input from "@/components/auth/Input";
import ErrorMessage from "@/components/auth/ErrorMessage";
import Button from "@mui/material/Button";

import useFormData from "@/components/auth/useFormData";

export default function Index() {
  const router = useRouter();

  const { formData, handleChange } = useFormData(); // Form data state
  const [message, setMessage] = useState<string>(""); // Message state

  // Get login data
  useEffect(() => {
    axios.get("/auth/user").then((res) => {
      // If user is logged in
      if (res.data.loggedIn === true) {
        router.push("/chat"); // Redirect to chat page
      }
    });
  }, [router]);

  // Set register success message
  useEffect(() => {
    setMessage(router.query.message as string);
  }, [router.query.message]);

  // Login user
  const validateRow = () => {
    // Validate user data
    axios
      .post("/auth/login", {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        setMessage(res.data);

        // If validation passed
        if (res.data === "Login successful") {
          router.push("/chat");
        }
      });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh
    setMessage(""); // Clear message

    validateRow(); // Validate user data
  };

  return (
    <>
      <Head>
        <title>ChatHub | Login</title>
      </Head>

      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-full sm:w-auto flex flex-col justify-center mx-5 sm:mx-0 p-5 sm:p-12 shadow-lg bg-white">
          {/* Heading */}
          <div className="pt-4 mb-4 mx-auto">
            <Image src="/images/logo.png" alt="logo" width={75} height={75} />
          </div>

          <h1 className="mb-3 text-center font-bold text-3xl tracking-wide text-black">
            Welcome back
          </h1>

          <div className="text-center tracking-wide text-gray-400">
            Sign into your account
          </div>

          {/* Registration form */}
          <form
            onSubmit={submitHandler} // Submit form on submit
            onKeyDown={(e) => {
              e.key === "Enter" && submitHandler; //Submit form on enter
            }}
            className="sm:w-[400px] py-8"
          >
            {/* Registered message */}
            {message === "Successfully registered, please login" && (
              <p className="mb-8 p-4 rounded font-medium text-xs text-green-700 bg-green-300">
                Successfully registered, please login
              </p>
            )}

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="email@email.com"
              value={formData.email}
              handleChange={handleChange}
              error={message === "Email does not exist" ? message : ""}
            />

            <ErrorMessage
              error={message === "Email does not exist" ? message : ""}
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Password123"
              value={formData.password}
              handleChange={handleChange}
              error={message === "Incorrect password" ? message : ""}
            />

            <ErrorMessage
              error={message === "Incorrect password" ? message : ""}
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
            <hr className="mb-6 border-t" />

            <div className="text-center">
              <div className="inline-block tracking-wide text-sm text-gray-400">
                Don&apos;t have an account yet?{" "}
                <Link
                  className="inline-block text-sm text-cyan-1000 align-baseline text-blue-500 hover:text-blue-700 hover:underline"
                  href="/register"
                >
                  Sign up.
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
