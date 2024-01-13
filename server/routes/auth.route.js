import express from "express";
import { handleSignUp, handleSignIn } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", handleSignUp);
router.post("/login", handleSignIn);

export default router;
