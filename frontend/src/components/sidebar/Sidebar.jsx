import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SettingsButton from "./SettingsButton";
const Sidebar = () => {
  return (
    <div className="sm:w-[200px] md:min-w-[250px] border-r  border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <div className="mt-auto flex items-center justify-between">
        <LogoutButton />
        <SettingsButton />
      </div>
    </div>
  );
};

export default Sidebar;
