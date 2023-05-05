import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as io from "socket.io-client";

import User from "@/interfaces/user";
import SessionUser from "@/interfaces/sessionUser";
import Message from "@/interfaces/message";
import ShowComponent from "@/interfaces/showComponent";

import Contacts from "@/components/chat/contacts/Contacts";
import Messages from "@/components/chat/messages/Messages";
import Profile from "@/components/chat/profile/Profile";

export default function Chat() {
  const socket = io.connect(process.env.NEXT_CLIENT_URL as string);
  const router = useRouter();

  const [isMobile, setIsMobile] = useState<boolean>(false); // Check if device is mobile
  
  const [messageList, setMessageList] = useState<Message[]>([]); // List of messages
  const [contact, setContact] = useState<User[]>([]); // User profile data
  // Session user data
  const [sessionUser, setSessionUser] = useState<SessionUser>({
    name: "",
    profilePicture: "",
    about: "",
  });
  // Show components
  const [showComponent, setShowComponent] = useState<ShowComponent>({
    welcomeMessage: true,
    showMessages: false,
    showProfile: false,
    isAccountSettings: false,
  });
  
  // Check if user is logged in
  useEffect(() => {
    axios.get("/auth/user").then((res) => {
      // If user is not logged in, redirect to login page
      if (res.data.loggedIn === false) {
        router.push("/");
        // Else, set user data
      } else {
        setSessionUser({
          name: res.data.firstName + " " + res.data.lastName,
          profilePicture: res.data.profilePicture,
          about: res.data.about,
        });
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
      setShowComponent(prevShowComponent => ({
        ...prevShowComponent,
        showMessages: true,
        showProfile: false,
      }));
    } else {
      setShowComponent(prevShowComponent => ({
        ...prevShowComponent,
        showMessages: false,
      }));
    };
  
    // Re-assign isMobile on window resize
    function handleResize() {
      setIsMobile(window.innerWidth < 760);
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, setIsMobile]);

  // Show profile column
  useEffect(() => {
    // If welcome message is false and not on mobile, show profile column
    if (showComponent.welcomeMessage === false && !isMobile) {
      setShowComponent(prevShowComponent => ({
        ...prevShowComponent,
        showProfile: true,
      }));
    };
  }, [isMobile, showComponent.welcomeMessage]);

  
  return (
    <>
      <Head>
        <title>ChatHub | Chat</title>
      </Head>

      <div className="w-screen h-screen relative bg-blue-200">
        <div className="absolute left-0 right-0 top-0 bottom-0 m-0 lg:m-5 xl:m-10 flex flex-row lg:rounded-2xl bg-white">
          {/* Chats column */}
          <Contacts
            socket={socket}
            isMobile={isMobile}
            setMessageList={setMessageList}
            showComponent={showComponent}
            setShowComponent={setShowComponent}
            setContact={setContact}
            sessionUser={sessionUser}
            setSessionUser={setSessionUser}
          />
  
          {/* Messages column */}
          <Messages
            socket={socket}
            isMobile={isMobile}
            messageList={messageList}
            setMessageList={setMessageList}
            showComponent={showComponent}
            setShowComponent={setShowComponent}
            contact={contact}
            sessionUser={sessionUser}
          />

          {/* Profile column */}
          <Profile 
            isMobile={isMobile}
            contact={contact}
            sessionUser={sessionUser}
            setSessionUser={setSessionUser}
            showComponent={showComponent}
            setShowComponent={setShowComponent}
          />
        </div>
      </div>
    </>
  );
};