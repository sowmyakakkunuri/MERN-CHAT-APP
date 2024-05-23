import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

const { ObjectId } = mongoose.Types;
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const receiverObjectId = new ObjectId(receiverId.trim());

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverObjectId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverObjectId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId: receiverObjectId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save(); // Ensure the conversation is saved
    // await newMessage.save();

    await Promise.all([conversation.save(), newMessage.save()]); // both happen at te same time

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({ message: "Conversation not found" });
    }
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
