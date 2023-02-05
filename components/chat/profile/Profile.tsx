import { useState } from "react";

import User from "@/interfaces/user";
import Recipient from "./Recipient";
import SessionUser from "./SessionUser";

export default function Profile(props: { profile: User[]; recipient: string }) {
  const { profile, recipient } = props;

  const [about, setAbout] = useState<boolean>(false);

  return (
    <div className="w-1/4 h-full flex flex-col">
      {recipient === "" ? (
        <SessionUser 
          about={about}
          setAbout={setAbout}
        />
      ) : (
        <Recipient
          profile={profile}
          about={about}
          setAbout={setAbout}
        />
      )}
    </div>
  );
}
