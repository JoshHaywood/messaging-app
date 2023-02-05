// Chat.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import User from "@/interfaces/user";
import Chats from "@/components/chat/user-list/UsersList";
import Messages from "@/components/chat/messages/Messages";
import Recipient from "@/components/chat/recipient/Recipient";

export default function Chat() {
  const router = useRouter();
  const [recipient, setRecipient] = useState<string>("");
  const [profile, setProfile] = useState<User[]>([]);

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
        <Chats 
          setRecipient={setRecipient}
        />

        {/* Messages column */}
        <Messages
          recipient={recipient}
          profile={profile}
          setProfile={setProfile}
        />

        <Recipient 
          recipient={recipient}
          profile={profile}
          setProfile={setProfile}
        />
      </div>
    </div>
  );
};