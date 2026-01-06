import { Router, Request, Response } from "express";
import prisma from "../config/database";
import { authLimiter } from "../config/rateLimit";
import {
  forgetPassController,
  resetPassController,
} from "../controllers/passwordControllers";
const router = Router();

router.post("/forget-password", authLimiter, forgetPassController);

router.post("/reset-password", authLimiter, resetPassController);
export default router;
