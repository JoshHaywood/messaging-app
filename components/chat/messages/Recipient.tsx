import Image from "next/image";

import User from "@/interfaces/user";

export default function Recipient(props: { profile: User[]; }) {
  const profile = props.profile;
    
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