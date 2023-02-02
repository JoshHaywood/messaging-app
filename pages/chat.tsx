import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

import Chats from "@/components/chat/recipients/Chats";
import Messages from "@/components/chat/messages/Messages";

export default function Chat() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    axios.get("/auth/user").then((res) => {
      // If user is not logged in, redirect to login page
      if (res.data.loggedIn === false) {
        router.push("/");
      };
    });
  }, []);

  return (
    <div className="w-screen h-screen relative bg-blue-200">
      <div className="absolute left-0 right-0 top-0 bottom-0 m-10 flex flex-row rounded-2xl bg-white">
        {/* Chats column */}
        <Chats />

        {/* Messages column */}
        <Messages />

        <div className="w-1/4 h-full flex flex-col p-5">
        </div>
      </div>
    </div>
  );
};