import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  console.log("conversations", conversations);
  return (
    <div className="flex py-2 flex-col overflow-auto">
      {conversations.length === 0 && !loading && (
        <div className="px-4 text-center sm-text-sm-xl md:text-lg text-gray-200 font-semibold flex flex-col items-center gap-2">
          Start your first Chat✨!Go to settings .. Add a friend ❄!
        </div>
      )}
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
};

export default Conversations;
