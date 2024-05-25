// src/components/settings/UserInfo.jsx
import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
const UserInfo = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="sm:w-[270px] md:w-[300px] sm:h-[300px] md:h-[480px]  bg-gray-400 bg-opacity-20 rounded-md p-9 backdrop-filter backdrop-blur-md ml-0 md:ml-7">
      
      <h1 className="text-2xl md:text-3xl font-bold mb-4  text-gray-800">
        My Profile
      </h1>
      <div className=" items-center mb-6">
        <img
          src={authUser.profilePic}
          alt="Profile"
          className="p-1 w-24 h-24 rounded-full border-4 border-white shadow-lg mr-6 sm:ml-5 md:ml-12"
        />
        <div>
          <p className="p-1 text-2xl md:text-3xl font-extrabold mb-1 text-white shadow-md">
            {authUser.fullName}
          </p>
          <p className="p-1 text md:text-xl font-bold text-gray-300 mb-1 shadow-md">
            @{authUser.userName}
          </p>
          <p className="p-1 text- md:text-xl font-bold text-gray-300 mb-1 shadow-md">
            {authUser.gender === "male" ? "♂️ Male" : "♀️ Female"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
