import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import ChatContext from "@/components/chat/ChatContext";
import User from "@/interfaces/user";

import SearchBar from "@/components/chat/contacts/SearchBar";
import ContactList from "@/components/chat/contacts/ContactList";
import Account from "@/components/chat/contacts/Account";

export default function Contacts() {
  const { isMobile, sessionUser, showComponent } = useContext(ChatContext);
  const [users, setUsers] = useState<User[]>([]); // Users array

  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Filtered users array

  // Get users from users table
  useEffect(() => {
    axios.get("/users/get").then((res) => {
      // Exclude session user
      const usersArray = res.data.filter((user: User) => {
        return user.first_name + " " + user.last_name !== sessionUser.name;
      });

      setUsers(usersArray);
    });
  }, [sessionUser.name]);

  // Handle search bar input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Set search term as input value

    // Filter users array based on search term excluding session user
    const filteredUsers = users.filter((user) => {
      return (
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        user.first_name + " " + user.last_name !== sessionUser.name
      );
    });
    setFilteredUsers(filteredUsers);
  };

  return (
    <div
      className={`${
        // Hide users list if mobile and messages or profile are shown
        (isMobile && showComponent.showMessages) ||
        (isMobile && showComponent.showProfile)
          ? "hidden"
          : "flex"
      } h-full w-full lg:w-1/4 flex-col pt-2.5 lg:pt-5 px-2.5 lg:px-5 pb-0`}
    >
      {/* Header */}
      <div className="flex flex-row items-center space-x-2.5">
        <Image src="/images/logo.png" alt="Logo" width={35} height={35} />

        <h1 className="hidden md:block font-bold tracking-wide">Chats</h1>
        <h1 className="block md:hidden font-bold tracking-wide">ChatHub</h1>
      </div>

      {/* Search bar */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleChange={handleChange}
      />

      {/* Recipients list */}
      <ContactList
        setSearchTerm={setSearchTerm}
        usersArray={
          /* If search term is empty, display all users, else display filtered users */
          searchTerm === "" ? users : filteredUsers
        }
      />

      {/* Account */}
      <Account />
    </div>
  );
}
