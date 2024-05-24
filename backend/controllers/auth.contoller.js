import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import generateTokeAndSetCookie from "../utils/generateToken.js";
export const signup = async (req, res) => {
  console.log(req.body);
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hashpassword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      const token = generateTokeAndSetCookie(newUser, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user?.password || "");

    if( !user || !isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateTokeAndSetCookie(user, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      gender: user.gender,
      profilePic: user.profilePic,
    })

  } catch {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Logged out successfully" });
  }
  catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};