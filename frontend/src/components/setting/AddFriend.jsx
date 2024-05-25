// import React, { useState } from "react";
// import useAddFriend from "../../hooks/useAddFriend";
// import { toast } from "react-hot-toast";
// // import useConversation from "../../zustand/useConversation";
// const AddFriend = () => {
//   const { addFriend, loading } = useAddFriend();
//   const [username, setUsername] = useState("");
//   //   const { setSelectedConversation } = useConversation();

//   //   setSelectedConversation(null);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Implement your logic to add a friend here
//     if (!username) return;

//     if (username < 3) {
//       toast("Please enter at least 3 characters");
//       return;
//     }
//     addFriend(username);
//     toast.success("Friend added successfully");
//     setUsername("");
//   };

//   return (
//     <div className="sm:w-[300px] md:w-[300px] sm:h-[300px] md:h-[480px] bg-gray-400 bg-opacity-20 rounded-md p-8 backdrop-filter backdrop-blur-md ml-4">
//       <h3 className="mt:10 text-3xl font-bold mb-8 text-gray-800">
//         Add Friend
//       </h3>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder="Enter friend's username"
//             defaultValue="HardcodedUsername"
//             className="p-1 w-full rounded-md border-gray-400 border-2 focus:outline-none focus:border-blue-500"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//         >
//           {loading ? (
//             <span className="loading loading-spinner"></span>
//           ) : (
//             "Add Friend"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddFriend;

import React, { useState } from "react";
import useAddFriend from "../../hooks/useAddFriend";
import { toast } from "react-hot-toast";
import useConversation from "../../zustand/useConversation";

const AddFriend = () => {
  const { addFriend, loading } = useAddFriend();
  const [username, setUsername] = useState("");
  const { setSelectedConversation } = useConversation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) return;

    if (username.length < 3) {
      toast.error("Please enter at least 3 characters");
      return;
    }

    try {
      await addFriend(username.toLowerCase());
    //   toast.success("Friend added successfully");
      setUsername("");
      setSelectedConversation(null); // Reset selected conversation
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="sm:w-[270px] md:w-[300px] sm:h-[300px] md:h-[480px] bg-gray-400 bg-opacity-20 rounded-md p-8 backdrop-filter backdrop-blur-md ml-2 md:ml-4 mr-6">
      <h3 className="mt:10 text-3xl font-bold mb-8 text-gray-800">
        Add Friend
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter friend's username"
            className="p-1 w-full rounded-md border-gray-400 border-2 focus:outline-none focus:border-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Add Friend"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddFriend;
