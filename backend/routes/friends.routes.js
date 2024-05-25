import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addFriend } from "../controllers/friends.controller.js";
const router = express.Router();

router.post('/addfriend/:username', protectRoute, addFriend);

export default router;
