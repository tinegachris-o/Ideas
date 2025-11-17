import express from "express";
const router = express.Router();
import { createUser,logout,login ,refreshToken} from "../controllers/auth.controller.js";
router.post("/register", createUser);
router.post("/logout", logout);
router.post("/login", login);
router.post("/refresh", refreshToken);

export default router;