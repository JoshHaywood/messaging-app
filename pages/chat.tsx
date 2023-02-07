import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "axios";

import User from "@/interfaces/user";
import UserList from "@/components/chat/user-list/UsersList";
import Messages from "@/components/chat/messages/Messages";
import Profile from "@/components/chat/profile/Profile";

export default function Chat() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false); // Check if device is mobile
  
  const [welcomeMessage, setWelcomeMessage] = useState<boolean>(true); // Show or hide welcome message
  const [showMessages, setShowMessages] = useState<boolean>(false); // Show or hide messages column

  const [showProfile, setShowProfile] = useState<boolean>(false); // Show or hide profile column
  const [isAccountSettings, setIsAccountSettings] = useState<boolean>(false); // Show account settings or profile
  
  const [profile, setProfile] = useState<User[]>([]); // User profile data
  const [name, setName] = useState<string>(""); // Account name
  const [profilePicture, setProfilePicture] = useState<string>(""); // Account profile picture
  const [about, setAbout] = useState<string>(""); // Account about

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

  // Show messages column
  useEffect(() => {
    // Prevent type error
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 760);
    };
    
    // If not on mobile, show messages and profile columns else hide them
    if (!isMobile) {
      setShowMessages(true);
      setShowProfile(false);
    } else {
      setShowMessages(false);
      setShowProfile(false);
    };
    
    // Re-assign isMobile on window resize
    function handleResize() {
      setIsMobile(window.innerWidth < 760);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, setShowMessages]);

  // Show profile column
  useEffect(() => {
    // If welcome message is false and not on mobile, show profile column
    if (welcomeMessage === false && !isMobile) {
      setShowProfile(true);
    };
  }, [welcomeMessage, isMobile, setShowProfile]);

  return (
    <>
      <Head>
        <title>ChatHub | Chat</title>
      </Head>

      <div className="w-screen h-screen relative bg-blue-200">
        <div className="absolute left-0 right-0 top-0 bottom-0 m-0 lg:m-5 xl:m-10 flex flex-row lg:rounded-2xl bg-white">
          {/* Chats column */}
          <UserList
            isMobile={isMobile}
            welcomeMessage={welcomeMessage}
            setWelcomeMessage={setWelcomeMessage}
            showMessages={showMessages}
            setShowMessages={setShowMessages}
            showProfile={showProfile}
            setShowProfile={setShowProfile}
            setIsAccountSettings={setIsAccountSettings}
            setProfile={setProfile}
            name={name}
            setName={setName}
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
          />
  
          {/* Messages column */}
          <Messages
            isMobile={isMobile}
            welcomeMessage={welcomeMessage}
            showMessages={showMessages}
            setShowMessages={setShowMessages}
            showProfile={showProfile}
            setShowProfile={setShowProfile}
            setIsAccountSettings={setIsAccountSettings}
            profile={profile}
          />

          {/* Profile column */}
          <Profile 
            isMobile={isMobile}
            welcomeMessage={welcomeMessage}
            setShowMessages={setShowMessages}
            showProfile={showProfile}
            setShowProfile={setShowProfile}
            isAccountSettings={isAccountSettings}
            setIsAccountSettings={setIsAccountSettings}
            profile={profile}
            name={name}
            profilePicture={profilePicture}
            about={about} 
          />
        </div>
      </div>
    </>
  );
};