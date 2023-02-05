import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import User from "@/interfaces/user";
import SearchBar from "./SearchBar";
import Users from "./Users";
import Account from "./Account";

export default function UsersList(props: {
  setRecipient: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  profilePicture: string;
  setProfilePicture: React.Dispatch<React.SetStateAction<string>>;
  setWelcomeMessage: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setRecipient, name, setName, profilePicture, setProfilePicture, setWelcomeMessage } = props;
  const [users, setUsers] = useState<User[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // Get users from users table
  useEffect(() => {
    axios.get("/users/get").then((res) => {
      setUsers(res.data);
    });
  }, []);

  // Handle search bar input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Set search term as input value

    // Filter users array based on search term
    const filteredUsers = users.filter((user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  return (
    <div className="w-1/4 h-full flex flex-col p-5 pb-0">
      {/* Header */}
      <div className="flex flex-row items-center space-x-2.5">
        <Image src="/images/logo.png" alt="Logo" width={35} height={35} />

        <h1 className="font-bold tracking-wide">Chats</h1>
      </div>

      {/* Search bar */}
      <SearchBar
        handleChange={handleChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Recipients list */}
      <Users
        /* If search term is empty, display all users, else display filtered users */
        usersArray={searchTerm === "" ? users : filteredUsers}
        setRecipient={setRecipient}
        setWelcomeMessage={setWelcomeMessage}
      />

      {/* Account */}
      <Account 
        setRecipient={setRecipient}
        name={name} 
        setName={setName}
        profilePicture={profilePicture} 
        setProfilePicture={setProfilePicture}
      />
    </div>
  );
};