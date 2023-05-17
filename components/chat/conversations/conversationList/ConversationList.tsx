import User from "@/interfaces/user";

import AcceptedContacts from "@/components/chat/conversations/conversationList/AcceptedContacts";
import PendingContacts from "./PendingContacts";

export default function ConversationList(props: {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setShowModel: React.Dispatch<React.SetStateAction<boolean>>;
  usersArray: User[];
}) {
  const { setSearchTerm, setShowModel, usersArray } = props;

  return (
    <div
      id="contacts-container"
      className="h-full overflow-y-scroll overflow-x-hidden -mr-1.5 lg:-mr-3.5 pr-1 lg:pr-2"
    >
      {/* Pending contacts */}
      <PendingContacts />

      {/* Accepted contacts */}
      <AcceptedContacts
        setSearchTerm={setSearchTerm}
        setShowModel={setShowModel}
        usersArray={usersArray}
      />
    </div>
  );
}
