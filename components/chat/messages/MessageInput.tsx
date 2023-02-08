import Message from "@/interfaces/message";
import User from "@/interfaces/user";
import { Socket } from "socket.io-client";

export default function MessageInput(props: {
  profile: User[];
  name: string;
  socket: Socket;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  messageList: Message[];
  setMessageList: React.Dispatch<React.SetStateAction<Message[]>>;
}) {
  const {
    profile,
    name,
    socket,
    message,
    setMessage,
    messageList,
    setMessageList,
  } = props;

  // Send message
  const sendMessage = () => {
    // Message content
    const messageContent: Message = {
      sender: name,
      recipient: profile[0].first_name + " " + profile[0].last_name,
      content: {
        message: message,
        time: new Date().getHours() + ":" + new Date().getMinutes(),
      },
    };

    socket.emit("send_message", messageContent); // Send message to server
    setMessageList([...messageList, messageContent]); // Add message to message list
    setMessage(""); // Clear input
  };

  return (
    <div className="flex flex-row items-center p-5 space-x-2.5 border border-b-0">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)} // Set messages value as input
        onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Send message on enter key
        className="w-full p-2.5 text-sm rounded-lg text-gray-700 bg-gray-100 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-500"
      ></input>

      {/* Attribution: https://heroicons.com/ */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        onClick={sendMessage} // Send message on click
        className="w-8 h-8 text-gray-500 hover:text-blue-500 hover:cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
        />
      </svg>
    </div>
  );
};