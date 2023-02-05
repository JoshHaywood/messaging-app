// Chat.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import User from "@/interfaces/user";
import UserList from "@/components/chat/user-list/UsersList";
import Messages from "@/components/chat/messages/Messages";
import Profile from "@/components/chat/profile/Profile";

export default function Chat() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [showProfile, setShowProfile] = useState<boolean>(false);

  const [recipient, setRecipient] = useState<string>("");
  const [profile, setProfile] = useState<User[]>([]);

  const [welcomeMessage, setWelcomeMessage] = useState<boolean>(true);

  // Check if user is logged in
  useEffect(() => {
    axios.get("/auth/user").then((res) => {
      // If user is not logged in, redirect to login page
      if (res.data.loggedIn === false) {
        router.push("/");
        // Else, set user data
      } else {
        setName(res.data.firstName + " " + res.data.lastName);
        setProfilePicture(res.data.profilePicture);
        setAbout(res.data.about);
      };
    });
  }, [router]);

  // Get recipient data
  useEffect(() => {
    // If recipient is empty, return
    if (recipient === "") {
      return
      // Else, get recipient data
    } else {
      axios.get(`/users/get/${recipient}`).then((res) => {
        setProfile(res.data);
      });
    };
  }, [recipient, setProfile]);

  // Show profile column
  useEffect(() => {
    // If welcome message is false, show profile column
    if (welcomeMessage === false) {
      setShowProfile(true);
    };
  }, [welcomeMessage]);

  return (
    <div className="w-screen h-screen relative bg-blue-200">
      <div className="absolute left-0 right-0 top-0 bottom-0 m-10 flex flex-row rounded-2xl bg-white">
        {/* Chats column */}
        <UserList
          setRecipient={setRecipient}
          name={name}
          setName={setName}
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
          welcomeMessage={welcomeMessage}
          setWelcomeMessage={setWelcomeMessage}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
        />
 
        {/* Messages column */}
        <Messages
          profile={profile}
          recipient={recipient}
          welcomeMessage={welcomeMessage}
          showProfile={showProfile}
        />

        {/* Profile column */}
        {showProfile && (
          <Profile 
            profile={profile}
            recipient={recipient}
            name={name}
            profilePicture={profilePicture}
            about={about}
          />
        )}
      </div>
    </div>
  );
};