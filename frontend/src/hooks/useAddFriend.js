import { useState } from "react";
import { toast } from "react-hot-toast";

const useAddFriend = () => {
  const [loading, setLoading] = useState(false);

  const addFriend = async (friendusername) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/friend/addfriend/${friendusername}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendusername }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to add friend.");
      }
      toast.success("Friend added successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, addFriend };
};

export default useAddFriend;
