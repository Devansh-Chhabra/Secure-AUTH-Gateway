import express from "express";
const router = express.Router();

import { login, logout, signup, verifyEmail, forgotPassword, resetPassword, checkAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

router.get("/check-auth",verifyToken,checkAuth)

router.post("/signup",signup)
router.post("/verify-email",verifyEmail)

router.post("/login",login)
router.post("/forgot-password",forgotPassword)
router.post("/reset-password/:token",resetPassword)

router.post("/logout",logout)

export default router;