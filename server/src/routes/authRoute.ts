import { Router, Request, Response } from "express";
import {
  registerController,
  loginController,
  credentialCheckController,
} from "../controllers/authController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import { authLimiter } from "../config/rateLimit.js";
const router = Router();

//REGISTER
router.post("/register", authLimiter, registerController);
//LOGIN
router.post("/login", authLimiter, loginController);

//LOGIN CHECK ROUTE
router.post("/check/credentials", authLimiter, credentialCheckController);
//GET USER
router.get("/user", authMiddleware, async (req: Request, res: Response) => {
  const user = req.user; //extracting the user after it has been verified by the auth middleware
  res.json({ data: user });
  return;
});
export default router;
