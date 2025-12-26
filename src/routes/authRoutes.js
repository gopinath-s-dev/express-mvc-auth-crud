import express from "express";
import AuthController from "../controllers/authController.js";
const router = express.Router({ caseSensitive: true, strict: true });

router.post("/auth/login", AuthController.login);
router.post(
  "/auth/request-password-reset",
  AuthController.requestPasswordReset
);
router.post("/auth/reset-password", AuthController.resetPassword);

export default router;
