import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useConversation from "../../zustand/useConversation";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";
const Messages = () => {
  const { messages, loading } = useGetMessages();

  useListenMessages();

  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3).keys()].map((i) => <MessageSkeleton key={i} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center text-gray-300">
          Start the conversation and break the silence!
        </p>
      )}
    </div>
  );
};

export default Messages;
