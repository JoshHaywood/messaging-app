import { createContext } from "react";

import User from "@/interfaces/user";
import SessionUser from "@/interfaces/sessionUser";
import Message from "@/interfaces/message";
import ShowComponent from "@/interfaces/showComponent";

interface ChatContextTypes {
  socket: any;
  isMobile: boolean;
  messageList: Message[];
  contact: User[];
  sessionUser: SessionUser;
  showComponent: ShowComponent;
  setMessageList: React.Dispatch<React.SetStateAction<Message[]>>;
  setContact: React.Dispatch<React.SetStateAction<User[]>>;
  setSessionUser: React.Dispatch<React.SetStateAction<SessionUser>>;
  setShowComponent: React.Dispatch<React.SetStateAction<ShowComponent>>;
}

const ChatContext = createContext<ChatContextTypes>({
  socket: null,
  isMobile: false,
  messageList: [],
  contact: [],
  sessionUser: {
    name: "",
    profilePicture: "",
    about: "",
  },
  showComponent: {
    welcomeMessage: true,
    showMessages: false,
    showProfile: false,
    isAccountSettings: false,
  },
  setMessageList: () => {},
  setContact: () => {},
  setSessionUser: () => {},
  setShowComponent: () => {},
});

export default ChatContext;
