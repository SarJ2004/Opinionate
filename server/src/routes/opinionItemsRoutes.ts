import { Router, Request, Response } from "express";
import {} from "../controllers/opinionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import getOpinionItems from "../controllers/opinionItemsController.js";
const router = Router();

router.post("/items", authMiddleware, getOpinionItems);
router.put("/:id");
router.delete("/:id");
export default router;
