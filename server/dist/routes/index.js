import { Router } from "express";
import authRoute from "./authRoute.js";
import verifyRoute from "./verifyRoute.js";
import passwordRoute from "./passwordRoute.js";
import opinionRoute from "./opinionRoute.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Router();
router.use("/api/auth", authRoute);
router.use("/api/auth", passwordRoute);
router.use("/", verifyRoute);
//now, this /opinion route will need to be proteted. It should only be accessible to authenticated users.
router.use("/api/opinion", authMiddleware, opinionRoute);
export default router;
