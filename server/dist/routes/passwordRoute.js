import { Router } from "express";
import { authLimiter } from "../config/rateLimit.js";
import { forgetPassController, resetPassController, } from "../controllers/passwordControllers.js";
const router = Router();
router.post("/forget-password", authLimiter, forgetPassController);
router.post("/reset-password", authLimiter, resetPassController);
export default router;
