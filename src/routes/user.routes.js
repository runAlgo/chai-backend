import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import sentMessage from "../controllers/message.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/message").post(sentMessage);

export default router;
