export default function Recipient() {
  return (
    <div className="flex flex-row items-center p-4 space-x-4 border">
      {/* Profile picture */}
      <img
        src="../images/default-profile.png"
        alt="User profile picture"
        width={45}
        height={45}
        className="rounded-full border"
      ></img>

      {/* User name and status */}
      <div className="w-full">
        <div className="font-medium text-gray-700">John Doe</div>

        <div className="flex flex-row items-center text-xs font-medium text-green-400">
          Online
        </div>
      </div>
    </div>
  );
};