import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoBD from "./db/connectToMongoDB.js";
import friendRoutes from "./routes/friends.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(express.json()); // to parse the incoming requests with json payloads
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/user", userRoutes);
app.use("/api/friend", friendRoutes);

app.listen(port, () => {
  connectToMongoBD();
  
  console.log(`Server running on port ${port}`);
});
