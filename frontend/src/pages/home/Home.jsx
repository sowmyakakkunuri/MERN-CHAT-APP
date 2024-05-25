import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
const Home = () => {
  return (
    <div className="flex sm:h-[350px] md:h-[550px] md:w-[750px] rounded-lg overflow-hidden h-full w-full p-9 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
