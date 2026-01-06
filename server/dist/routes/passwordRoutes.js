import { Router } from "express";
import { authLimiter } from "../config/rateLimit";
import { forgetPassController } from "../controllers/passwordControllers";
const router = Router();
router.post("/forget-password", authLimiter, forgetPassController);
export default router;
