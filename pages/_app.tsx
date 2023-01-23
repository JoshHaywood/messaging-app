import "@/app.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="author" content="Josh Haywood" />
        <meta
          name="description"
          content="
            A real-time messaging app built with React, Next.js, Express, Node.js, TypeScript, Tailwind CSS and socket.io.
            It allows users to send and receive messages in real-time, perfect for team communication. Built with performance and scalability in mind.
          "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="@/images/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </>
  );
};