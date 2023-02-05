import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";

import Profile from "@/interfaces/user";

export default function Recipient(props: { recipient: string; profile: Profile[]; setProfile: (value: Profile[]) => void;}) {
  const { recipient, profile, setProfile } = props;

  // Get recipient data
  useEffect(() => {
    // If recipient is empty, return
    if (recipient === "") return;

    // Else, get recipient data
    else {
      axios.get(`/users/get/${recipient}`).then((res) => {
        setProfile(res.data);
      });
    };
  }, [recipient, setProfile]);
    
  return (
    <>
      {profile.map((profile, index) => (
        <div 
          key={index} 
          className="flex flex-row items-center p-4 space-x-4 border border-b-0"
        >
          {/* Profile picture */}
          <Image
            src={"/images/" + profile.profile_picture}
            alt="User profile picture"
            width={45}
            height={45}
            className="rounded-full border"
          ></Image>

          {/* User name and status */}
          <div>
            <div className="font-medium text-gray-700">{profile.first_name + " " + profile.last_name}</div>

            <div className="text-xs font-medium text-green-400">
              Online
            </div>
          </div>
        </div>
      ))}
    </>
  );
};