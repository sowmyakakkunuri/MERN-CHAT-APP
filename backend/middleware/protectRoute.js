import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    // console.log(verified);
    const user = await User.findById(verified._id).select("-password");
    // console.log(user);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default protectRoute;
