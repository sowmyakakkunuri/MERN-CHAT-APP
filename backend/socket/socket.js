import { Server } from "socket.io";

import http from "http";

import express from "express";

// import getReceiverSocketId from "../utils/getReceiverSocketId";

const app = express();


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin:[ "http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {

    console.log(`User Connected: ${socket.id}`);

    const userId = socket.handshake.query.userId;
    
    if (userId != undefined) {
        userSocketMap[userId] = socket.id;
    }

    //io.emit() will send event to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export { app, io, server };