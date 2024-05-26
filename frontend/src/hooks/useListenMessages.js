import { useSocketContext } from "../context/SocketContext";
import { useEffect } from "react";
import useConversation from "../zustand/useConversation.js";
import notificationSound from "../assets/sounds/notification.mp3";
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldSlide = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });
    return () => socket?.off("newMessage");
  }, [messages, setMessages, socket]);
};

export default useListenMessages;
