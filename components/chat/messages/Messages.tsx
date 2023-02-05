import Image from "next/image";

import User from "@/interfaces/user";
import Recipient from "./Recipient";
import MessageInput from "./MessageInput";

function RecipientMessage() {
  return (
    <div className="flex flex-row space-x-2.5">
      {/* Profile picture */}
      <div className="h-full">
        <Image
          src="/images/default-profile.png"
          alt="User profile picture"
          width={35}
          height={35}
          className="rounded-full border"
        ></Image>
      </div>

      {/* Message */}
      <div className="max-w-[55%]">
        <div className="flex flex-row items-baseline space-x-1.5 mb-1">
          <div className="text-[12px] text-gray-700">John Doe</div>
          <div className="text-[10px] text-gray-400">00:00 AM</div>
        </div>

        <div className="break-words p-2.5 text-[13px] rounded-xl rounded-tl-none text-gray-700 bg-gray-100">
          Message content
        </div>
      </div>
    </div>
  );
}

function SenderMessage() {
  return (
    <div className="flex flex-row justify-end space-x-2.5">
      {/* Message */}
      <div className="max-w-[55%]">
        <div className="flex justify-end mb-1 text-[10px] text-gray-400">
          00:00 AM
        </div>

        <div className="justify-end break-words p-2.5 text-[13px] rounded-xl rounded-tr-none text-white bg-blue-500">
          Message content
        </div>
      </div>

      {/* Profile picture */}
      <div className="h-full">
        <Image
          src="/images/default-profile.png"
          alt="User profile picture"
          width={35}
          height={35}
          className="rounded-full border"
        ></Image>
      </div>
    </div>
  );
}

export default function Messages(props: {
  profile: User[];
  welcomeMessage: boolean;
  showProfile: boolean;
}) {
  const { profile, welcomeMessage, showProfile } = props;

  return (
    <div className={`${welcomeMessage && !showProfile ? "w-full" : "w-1/2"} h-full flex flex-col`}>
      {/* If no recipient has been selected and welcome message is set to true, show the welcome message. Else show message data */}
      {welcomeMessage ? (
        /* Welcome message */
        <div className="h-full flex flex-col justify-center items-center p-5 border">
          <Image
            src="/images/logo.png"
            alt="Chathub logo"
            width={100}
            height={100}
          />

          <div className="mt-8 text-3xl font-semibold tracking-wide text-gray-700">
            Welcome to ChatHub
          </div>

          <p className="mt-4 max-w-2xl text-center text-gray-400">
            Where you can connect with friends, family, and colleagues in
            real-time. Start a conversation or join an existing one to share
            updates, thoughts, and memories. With ChatHub, you&apos;re always
            connected to the people who matter most to you. Just search for a
            friend or colleague and start chatting.
          </p>
        </div>
      ) : (
        <>
          <Recipient profile={profile} />

          <div
            id="messages-container"
            className="h-full p-4 pt-8 space-y-5 overflow-y-scroll border"
          >
            <RecipientMessage />

            <SenderMessage />
          </div>

          <MessageInput />
        </>
      )}
    </div>
  );
};