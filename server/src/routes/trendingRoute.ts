import { Router } from "express";
import { getTrendingVersos } from "../controllers/trendingController.js";

const router = Router();

router.get("/trending", getTrendingVersos);

export default router;
