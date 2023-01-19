import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import logo from "../public/images/logo.png";
import Input from "../components/auth/Input";
import Button from "@mui/material/Button";

export default function Index() {
  return (
    <>
      <Head>
        <title>Website name | Home</title>
      </Head>

      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-auto flex flex-col justify-center p-5 sm:p-12 shadow-lg bg-white">
          {/* Heading */}
          <div className="pt-4 mb-4 mx-auto">
            <Image src={logo} alt="logo" width={75} height={75} />
          </div>

          <h1 className="mb-3 text-center font-bold text-3xl tracking-wide text-black">Welcome back</h1>

          <div className="text-center tracking-wide text-gray-400">Sign into your account</div>

          {/* Registration form */}
          <form className="sm:mx-auto sm:w-[400px] py-8">
            {/* Email */}
            <Input label="Email Address" type="email" placeholder="email@email.com" />

            {/* Password */}
            <Input label="Password" type="password" placeholder="Password123" />

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
            <hr className="mb-6 border-t" />
            
            <div className="text-center">
              <div className="inline-block tracking-wide text-sm text-gray-400">
                Don't have an account yet? {" "}
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
