import Image from "next/image";

import Logo from "@/public/images/logo.png";
import SearchBar from "./SearchBar";
import Users from "./Users";
import Account from "./Account";

export default function Chats() {
  return (
    <div className="w-1/4 h-full flex flex-col p-5 pb-0 border">
      {/* Header */}
      <div className="flex flex-row items-center space-x-2.5">
        <Image
          src={Logo}
          alt="Logo"
          width={35}
          height={35}
        />

        <h1 className="font-bold tracking-wide">Chats</h1>
      </div>

      {/* Search bar */}
      <SearchBar />

      {/* Recipients list */}
      <Users />

      {/* Account */}
      <Account />
    </div>
  );
};