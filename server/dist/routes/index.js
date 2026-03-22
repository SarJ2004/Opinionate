import { Router } from "express";
import authRoute from "./authRoute.js";
import verifyRoute from "./verifyRoute.js";
import passwordRoute from "./passwordRoute.js";
const router = Router();
router.use("/api/auth", authRoute);
router.use("/api/auth", passwordRoute);
router.use("/", verifyRoute);
export default router;
