import User from "@/interfaces/user";
import AcceptedContacts from "@/components/chat/conversations/conversationList/AcceptedContacts";
import PendingContacts from "./PendingContacts";

export default function ConversationList(props: {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  usersArray: User[];
}) {
  const { setSearchTerm, usersArray } = props;

  return (
    <>
      <PendingContacts usersArray={usersArray} />

      <AcceptedContacts setSearchTerm={setSearchTerm} usersArray={usersArray} />
    </>
  );
}
