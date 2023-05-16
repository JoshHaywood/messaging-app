import User from "@/interfaces/user";
import Contact from "@/interfaces/contact";

import AcceptedContacts from "@/components/chat/conversations/conversationList/AcceptedContacts";
import PendingContacts from "./PendingContacts";

export default function ConversationList(props: {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  usersArray: User[];
  pendingContacts: Contact[];
  setPendingContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}) {
  const { setSearchTerm, usersArray, pendingContacts, setPendingContacts } =
    props;

  return (
    <div
      id="contacts-container"
      className="h-full overflow-y-scroll overflow-x-hidden -mr-1.5 lg:-mr-3.5 pr-1 lg:pr-2"
    >
      <PendingContacts
        pendingContacts={pendingContacts}
        setPendingContacts={setPendingContacts}
      />

      <AcceptedContacts setSearchTerm={setSearchTerm} usersArray={usersArray} />
    </div>
  );
}
