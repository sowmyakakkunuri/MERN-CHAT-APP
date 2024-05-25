// import User from "../models/user.model.js";

// export const getUsersForSideBar = async (req, res) => {
//     try {

//         const loggedInUserId = req.user._id;

//         const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

//         res.status(200).json(filteredUsers);
//         // res.status(200).json(users);
//     } catch (error) {
//         console.log("Error in getUsersForSideBar controller", error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }



import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Find the logged-in user and populate their friends
    const loggedInUser = await User.findById(loggedInUserId).populate(
      "friends",
      "-password"
    );

    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the populated friends
    res.status(200).json(loggedInUser.friends);
  } catch (error) {
    console.log("Error in getUsersForSideBar controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
