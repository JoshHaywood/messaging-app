import { useState } from "react";

import User from "@/interfaces/user";
import Recipient from "./Recipient";
import SessionUser from "./SessionUser";

export default function Profile(props: {
  welcomeMessage: boolean;
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
    welcomeMessage,
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
    <div className="w-1/4 h-full hidden lg:flex flex-col">
      {isAccountSettings ? (
        <SessionUser
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
          profile={profile}
          about={aboutToggle}
          setAbout={setAboutToggle}
        />
      )}
    </div>
  );
};