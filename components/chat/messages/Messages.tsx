import Recipient from "./Recipient";

export default function Messages() {
  return (
    <div className="w-1/2 h-full flex flex-col">
      <Recipient />

      <div className="h-full border p-4">
        message section
      </div>
    </div>
  );
};