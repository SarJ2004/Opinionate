import { Router } from "express";
import authRoute from "./authRoute.js";
import verifyRoute from "./verifyRoute.js";
import passwordRoute from "./passwordRoute.js";
import versoRoute from "./versoRoute.js";
import versoItemsRoute from "./versoItemsRoutes.js";
import trendingRoute from "./trendingRoute.js";
const router = Router();
router.use("/api/auth", authRoute);
router.use("/api/auth", passwordRoute);
router.use("/", verifyRoute);
//now, this /verso route will need to be proteted. It should only be accessible to authenticated users.
router.use("/api/verso", trendingRoute);
router.use("/api/verso", versoRoute);
router.use("/api/verso", versoItemsRoute);
export default router;
