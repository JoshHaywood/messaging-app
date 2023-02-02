import Recipient from "./Recipient";

function RecipientMessage() {
  return (
    <div className="flex flex-row space-x-2.5">
      {/* Profile picture */}
      <div className="h-full">
        <img
          src="../images/default-profile.png"
          alt="User profile picture"
          width={35}
          height={35}
          className="rounded-full border"
        ></img>
      </div>

      {/* Message */}
      <div>
        <div className="flex flex-row items-baseline space-x-1.5 mb-1">
          <div className="text-[12px] text-gray-700">John Doe</div>
          <div className="text-[10px] text-gray-400">00:00 AM</div>
        </div>

        <div className="inline-block p-2.5 text-[13px] rounded-xl rounded-tl-none text-gray-700 bg-gray-100">
          Message content
        </div>
      </div>
    </div>
  );
};

function SenderMessage() {
  return (
    <div className="flex flex-row justify-end space-x-2.5">
      {/* Message */}
      <div>
        <div className="flex justify-end mb-1 text-[10px] text-gray-400">
          00:00 AM
        </div>

        <div className="inline-block p-2.5 text-[13px] rounded-xl rounded-tr-none text-white bg-blue-500">
          Message content
        </div>
      </div>

      {/* Profile picture */}
      <div className="h-full">
        <img
          src="../images/default-profile.png"
          alt="User profile picture"
          width={35}
          height={35}
          className="rounded-full border"
        ></img>
      </div>
    </div>
  );
};

export default function Messages() {
  return (
    <div className="w-1/2 h-full flex flex-col">
      <Recipient />

      <div 
        id="messages-container"
        className="h-full p-4 pt-8 space-y-5 overflow-y-scroll border"
      >
        <RecipientMessage />

        <SenderMessage />
      </div>
    </div>
  );
};