import User from "../models/user.model.js";

export const addFriend = async (req, res) => {
  try {
    const { username: friendUsername } = req.params;
    const loggedInUserId = req.user._id;

    // Fetch all users and map through their usernames
    const users = await User.find();
    const friend = users.find(
      (user) => user.userName.toLowerCase() === friendUsername.toLowerCase()
    );

    // Fetch the logged-in user
    const user = await User.findById(loggedInUserId);

    if (!friend || !user) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    if (user.friends.includes(friend._id)) {
      return res
        .status(400)
        .json({ message: "Friend is already in user's friends list" });
    }

    user.friends.push(friend._id);
    friend.friends.push(loggedInUserId);
    await user.save();
    await friend.save();
    res.status(200).json({ message: "Friend added successfully" });
  } catch (error) {
    console.error("Error in addFriend controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
