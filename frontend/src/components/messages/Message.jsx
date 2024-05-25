import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = authUser._id === message.senderId;
  
  const classChat = fromMe ? "chat chat-end" : "chat chat-start";

  const classChatBubble = fromMe ? "bg-blue-500" : "bg-slate-700";

  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;

  const formattedTime = extractTime(message.createdAt);

  return (
    <div className={`${classChat}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${classChatBubble}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
