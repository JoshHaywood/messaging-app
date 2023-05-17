import Image from "next/image";
import { useContext, useEffect } from "react";
import axios from "axios";

import Contact from "@/interfaces/contact";
import ChatContext from "../../ChatContext";

export default function PendingContacts(props: {
  pendingContacts: Contact[];
  setPendingContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}) {
  const { pendingContacts, setPendingContacts } = props;
  const { socket } = useContext(ChatContext);

  // Accept contact request
  const acceptRequest = (contact: Contact) => {
    const encodedSender = encodeURIComponent(contact.sender); // Encode sender as it contains special characters

    // Delete contact from contacts table
    axios.put(`/contacts/accept/${encodedSender}`).then((res) => {
      // If successful, emit contact request accepted
      if (res.data === "Contact request accepted") {
        socket.emit("accept_contact_request", contact);
      }
    });
  };

  // Decline contact request
  const declineRequest = (contact: Contact) => {
    const encodedSender = encodeURIComponent(contact.sender); // Encode sender as it contains special characters

    // Delete contact from contacts table
    axios.delete(`/contacts/decline/${encodedSender}`).then((res) => {
      // If successful, emit contact request declined
      if (res.data === "Contact request declined") {
        socket.emit("decline_contact_request", contact);
      }
    });
  };

  // On contact request accepted
  useEffect(() => {
    socket.on("contact_request_accepted", (data: Contact) => {
      // Remove contact from pending contacts
      setPendingContacts((prev) =>
        prev.filter((contact) => contact.sender !== data.sender)
      );
    });

    // Prevent multiple occurrences
    return () => {
      socket.off("contact_request_accepted");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On contact request declined
  useEffect(() => {
    socket.on("contact_request_declined", (data: Contact) => {
      // Remove contact from pending contacts
      setPendingContacts((prev) =>
        prev.filter((contact) => contact.sender !== data.sender)
      );
    });

    // Prevent multiple occurrences
    return () => {
      socket.off("contact_request_declined");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {pendingContacts.map((contact, index) => (
        <div
          key={index}
          className={`${
            index === pendingContacts.length - 1 ? "mb-4" : "mb-2.5"
          } px-1 lg:px-2.5 flex flex-row items-center py-2 space-x-4 rounded-lg`}
        >
          {/* Profile picture */}
          <Image
            src={contact.sender_picture}
            alt="User profile picture"
            width={45}
            height={45}
            className="aspect-square rounded-full border"
          />

          <div className="w-full">
            {/* Name and username */}
            <div className="relative flex flex-row justify-between">
              <div>
                <div className="text-gray-700">{contact.sender_name}</div>

                <div className="text-sm font-medium text-gray-300">
                  {contact.sender}
                </div>
              </div>

              {/* Accept or decline icons */}
              <div className="flex flex-row items-center space-x-2.5">
                {/* Attribution: https://heroicons.com/ */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  onClick={() => acceptRequest(contact)}
                  className="w-6 h-6 stroke-gray-700 hover:stroke-blue-500 hover:cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>

                {/* Attribution: https://heroicons.com/ */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  onClick={() => declineRequest(contact)}
                  className="w-6 h-6 stroke-gray-700 hover:stroke-blue-500 hover:cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}

      {pendingContacts.length > 0 && (
        <hr className="border border-blue-100 rounded mb-6 mx-6"></hr>
      )}
    </>
  );
}
