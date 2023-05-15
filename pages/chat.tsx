import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import * as io from "socket.io-client";
import axios from "axios";

import ChatContext from "@/components/chat/ChatContext";

import User from "@/interfaces/user";
import SessionUser from "@/interfaces/sessionUser";
import Message from "@/interfaces/message";
import ShowComponent from "@/interfaces/showComponent";

import Conversations from "@/components/chat/conversations/Conversations";
import Messages from "@/components/chat/messages/Messages";
import Profile from "@/components/chat/profile/Profile";

export default function Chat() {
  const socket = io.connect(process.env.NEXT_CLIENT_URL as string);
  const router = useRouter();

  const isMobile = useMediaQuery({ query: "(max-width: 760px)" });

  const [messageList, setMessageList] = useState<Message[]>([]); // List of messages
  const [contact, setContact] = useState<User[]>([]); // User profile data
  // Session user data
  const [sessionUser, setSessionUser] = useState<SessionUser>({
    name: "",
    userName: "",
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
          userName: res.data.userName,
          profilePicture: res.data.profilePicture,
          about: res.data.about,
        });
      }
    });
  }, [router]);

  // Show messages column
  useEffect(() => {
    // If not on mobile, show messages and profile columns else hide them
    if (!isMobile) {
      setShowComponent((prevShowComponent) => ({
        ...prevShowComponent,
        showMessages: true,
        showProfile: false,
      }));
    } else {
      setShowComponent((prevShowComponent) => ({
        ...prevShowComponent,
        showMessages: false,
      }));
    }
  }, [isMobile]);

  // Show profile column
  useEffect(() => {
    // If welcome message is false and not on mobile, show profile column
    if (showComponent.welcomeMessage === false && !isMobile) {
      setShowComponent((prevShowComponent) => ({
        ...prevShowComponent,
        showProfile: true,
      }));
    }
  }, [isMobile, showComponent.welcomeMessage]);

  return (
    <>
      <Head>
        <title>ChatHub | Chat</title>
      </Head>

      <div className="w-screen h-screen relative bg-blue-200">
        <div className="absolute left-0 right-0 top-0 bottom-0 m-0 lg:m-5 xl:m-10 flex flex-row lg:rounded-2xl bg-white">
          <ChatContext.Provider
            value={{
              socket,
              isMobile,
              messageList,
              contact,
              sessionUser,
              showComponent,
              setMessageList,
              setContact,
              setSessionUser,
              setShowComponent,
            }}
          >
            {/* Conversations column */}
            <Conversations />

            {/* Messages column */}
            <Messages />

            {/* Profile column */}
            <Profile />
          </ChatContext.Provider>
        </div>
      </div>
    </>
  );
}
