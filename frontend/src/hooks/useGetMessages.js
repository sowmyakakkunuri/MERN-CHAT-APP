import React from "react";
import { useState, useEffect } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-hot-toast";
const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    if (!selectedConversation?._id) return;
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        if (res.status === 404) {
          const errorData = await res.json();
          setMessages([]);
          return;
        }
        const data = await res.json();

        if (data.error) {
          setMessages([]);
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, [selectedConversation._id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
