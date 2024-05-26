import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        // Populate messages for each conversation
        const populatedConversations = await Promise.all(
          data.map(async (conversation) => {
            const response = await fetch(
              `/api/messages/${conversation._id}`)
            const messages = await response.json();
            return { ...conversation, messages };
          })
        );

        
        const sortedConversations = populatedConversations.sort((a, b) => {
          // Get the last message from each conversation
          const lastMessageA = a.messages[a.messages.length - 1];
          const lastMessageB = b.messages[b.messages.length - 1];

          // Convert the createdAt timestamps to Date objects
          const dateA =
            lastMessageA && lastMessageA.createdAt
              ? new Date(lastMessageA.createdAt)
              : new Date(0);
          const dateB =
            lastMessageB && lastMessageB.createdAt
              ? new Date(lastMessageB.createdAt)
              : new Date(0);

          // Compare the timestamps to sort by the most recent message
          return dateB - dateA;
        });

        setConversations(sortedConversations);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;

// import React, { useEffect } from "react";
// import { useState } from "react";
// import { toast } from "react-hot-toast";

// const useGetConversations = () => {
//   const [loading, setLoading] = useState(false);
//   const [conversations, setConversations] = useState([]);

//   useEffect(() => {
//     const getConversations = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch("/api/user", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const data = await res.json();
//         if (data.error) {
//           throw new Error(data.error);
//         }
//         setConversations(data);
//       } catch (error) {
//         toast.error(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getConversations();
//   }, []);

//   return { loading, conversations };
// };

// export default useGetConversations;
