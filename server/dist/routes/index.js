import { Router } from "express";
import authRoute from "./authRoute.js";
import verifyRoute from "./verifyRoute.js";
import passwordRoute from "./passwordRoute.js";
import opinionRoute from "./opinionRoute.js";
import opinionItemsRoute from "./opinionItemsRoutes.js";
const router = Router();
router.use("/api/auth", authRoute);
router.use("/api/auth", passwordRoute);
router.use("/", verifyRoute);
//now, this /opinion route will need to be proteted. It should only be accessible to authenticated users.
router.use("/api/opinion", opinionRoute);
router.use("/api/opinion", opinionItemsRoute);
export default router;
