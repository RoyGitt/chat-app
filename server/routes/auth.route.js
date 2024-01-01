import express from "express";
import { handleSignUp, handleSignIn } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", handleSignUp);
router.post("/sign-in", handleSignIn);

export default router;
