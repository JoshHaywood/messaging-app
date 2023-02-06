import { useState } from "react";

import User from "@/interfaces/user";
import Recipient from "./Recipient";
import SessionUser from "./SessionUser";

export default function Profile(props: {
  isMobile: boolean;
  welcomeMessage: boolean;
  setShowMessages: React.Dispatch<React.SetStateAction<boolean>>;
  showProfile: boolean;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  isAccountSettings: boolean;
  setIsAccountSettings: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User[];
  name: string;
  profilePicture: string;
  about: string;
}) {
  const {
    isMobile,
    welcomeMessage,
    setShowMessages,
    showProfile,
    setShowProfile,
    isAccountSettings,
    setIsAccountSettings,
    profile,
    name,
    profilePicture,
    about,
  } = props;

  const [aboutToggle, setAboutToggle] = useState<boolean>(false);

  return (
    <>
      {showProfile && (
        <div className="w-full sm:w-1/4 h-full flex flex-col">
          {isAccountSettings ? (
            <SessionUser
              isMobile={isMobile}
              welcomeMessage={welcomeMessage}
              showProfile={showProfile}
              setShowProfile={setShowProfile}
              setIsAccountSettings={setIsAccountSettings}
              name={name}
              profilePicture={profilePicture}
              about={about}
              aboutToggle={aboutToggle}
              setAboutToggle={setAboutToggle}
            />
          ) : (
            <Recipient
              isMobile={isMobile}
              setShowMessages={setShowMessages}
              setShowProfile={setShowProfile}
              profile={profile}
              about={aboutToggle}
              setAbout={setAboutToggle}
            />
          )}
        </div>
      )}
    </>
  );
};