import { Router, Request, Response } from "express";
import {} from "../controllers/versoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import postVersoItems from "../controllers/versoItemsController.js";
const router = Router();

router.post("/items", authMiddleware, postVersoItems);
// router.put("/:id");
// router.delete("/:id");
export default router;
