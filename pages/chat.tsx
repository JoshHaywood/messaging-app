import Chats from "@/components/chat/recipients/Chats";

export default function Chat() {
  return (
    <div className="w-screen h-screen relative bg-blue-200">
      <div className="absolute left-0 right-0 top-0 bottom-0 m-10 flex flex-row rounded-2xl bg-white">
        {/* Chats column */}
        <Chats />

        <div className="w-1/2 h-full flex flex-col p-5 border">
        </div>

        <div className="w-1/4 h-full flex flex-col p-5 border">
        </div>
      </div>
    </div>
  );
};