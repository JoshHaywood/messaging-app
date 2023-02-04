import Image from "next/image";

export default function Recipient() {
  return (
    <div className="flex flex-row items-center p-4 space-x-4 border border-b-0">
      {/* Profile picture */}
      <Image
        src="/images/default-profile.png"
        alt="User profile picture"
        width={45}
        height={45}
        className="rounded-full border"
      ></Image>

      {/* User name and status */}
      <div>
        <div className="font-medium text-gray-700">John Doe</div>

        <div className="text-xs font-medium text-green-400">
          Online
        </div>
      </div>
    </div>
  );
};