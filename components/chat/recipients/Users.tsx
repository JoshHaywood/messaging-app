import Image from "next/image";

import DefaultProfile from "@/public/images/default-profile.png";

export default function Users() {
  return (
    <div className="my-5 flex flex-row items-center py-2 space-x-4 rounded-lg">
      <Image
        src={DefaultProfile}
        alt="Default Profile"
        width={45}
        height={45}
        className="rounded-full border"
      />

      <div className="w-full">
        {/* Profile picture */}
        <div className="font-medium text-gray-700">
          John Doe
        </div>
        
        {/* Message preview */}
        <div className="relative flex flex-row justify-between space-x-2.5 text-sm text-gray-400">
          {/* Placeholder text used instead of div to prevent overflow */}
          <input
            className="ellipsis w-2/3 overflow-hidden overflow-ellipsis whitespace-nowrap"
            type="text"
            placeholder="Vestibulum vitae mi venenatis eleifend"
          ></input>

          <div className="w-1/3 text-gray-400">
            &#x2022; <span className="text-blue-400">5min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
