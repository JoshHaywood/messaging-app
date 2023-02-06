import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import User from "@/interfaces/user";
import SearchBar from "./SearchBar";
import Users from "./Users";
import Account from "./Account";

export default function UsersList(props: {
  welcomeMessage: boolean;
  setWelcomeMessage: React.Dispatch<React.SetStateAction<boolean>>;
  showProfile: boolean;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAccountSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setProfile: React.Dispatch<React.SetStateAction<User[]>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  profilePicture: string;
  setProfilePicture: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {
    welcomeMessage,
    setWelcomeMessage,
    showProfile,
    setShowProfile,
    setIsAccountSettings,
    setProfile,
    name,
    setName,
    profilePicture,
    setProfilePicture,
  } = props;
  const [users, setUsers] = useState<User[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // Get users from users table
  useEffect(() => {
    axios.get("/users/get").then((res) => {
      // Exclude session user
      const usersArray = res.data.filter((user: User) => {
        return user.first_name + " " + user.last_name !== name;
      });

      setUsers(usersArray);
    });
  }, [name]);

  // Handle search bar input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Set search term as input value

    // Filter users array based on search term excluding session user
    const filteredUsers = users.filter((user) => {
      return (
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        user.first_name + " " + user.last_name !== name
      );
    });
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
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleChange={handleChange}
      />

      {/* Recipients list */}
      <Users
        setWelcomeMessage={setWelcomeMessage}
        setIsAccountSettings={setIsAccountSettings}
        setProfile={setProfile}
        setSearchTerm={setSearchTerm}
        /* If search term is empty, display all users, else display filtered users */
        usersArray={searchTerm === "" ? users : filteredUsers}
      />

      {/* Account */}
      <Account
        welcomeMessage={welcomeMessage}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        setIsAccountSettings={setIsAccountSettings}
        name={name}
        setName={setName}
        profilePicture={profilePicture}
        setProfilePicture={setProfilePicture}
      />
    </div>
  );
};