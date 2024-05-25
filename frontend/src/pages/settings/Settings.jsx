// src/pages/Settings.jsx
import React from "react";
import UserInfo from "../../components/setting/UserInfo";
import AddFriend from "../../components/setting/AddFriend";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
const Settings = () => {
  return (
    <div className="relative flex sm:h-[350px] md:h-[550px] md:w-[800px] sm:w-[800px] rounded-lg overflow-hidden h-full w-full p-9 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5">
      <UserInfo />
      <AddFriend />
      <div className="relative flex flex-col items-center">
        <Link
          to="/"
          className="absolute text-gray-100 px-2 py-2  hover:bg-gray-500 focus:outline focus:bg-blue-600  md:top-0 md:left-0 bg-gray-400 bg-opacity-20 rounded-md p-8 backdrop-filter backdrop-blur-md"
        >
          <AiFillHome className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </Link>
      </div>
    </div>
  );
};

export default Settings;
