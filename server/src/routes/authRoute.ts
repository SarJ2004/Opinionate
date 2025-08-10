import { Router, Request, Response } from "express";
import { registerController } from "../controllers/authController.js";
import { loginController } from "../controllers/authController.js";
const router = Router();

//REGISTER
router.post("/register", registerController);
router.post("/login", loginController);

export default router;
