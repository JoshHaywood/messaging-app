import { useState } from "react";

import User from "@/interfaces/user";
import Recipient from "./Recipient";
import SessionUser from "./SessionUser";

export default function Profile(props: {
  profile: User[];
  recipient: string;
  name: string;
  profilePicture: string;
  about: string;
}) {
  const { profile, recipient, name, profilePicture, about } = props;

  const [aboutToggle, setAboutToggle] = useState<boolean>(false);

  return (
    <div className="w-1/4 h-full flex flex-col">
      {recipient === "" ? (
        <SessionUser
          aboutToggle={aboutToggle}
          setAboutToggle={setAboutToggle}
          name={name}
          profilePicture={profilePicture}
          about={about}
        />
      ) : (
        <Recipient profile={profile} about={aboutToggle} setAbout={setAboutToggle} />
      )}
    </div>
  );
};