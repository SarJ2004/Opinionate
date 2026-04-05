import { Router, Request, Response } from "express";
import {} from "../controllers/opinionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import postOpinionItems from "../controllers/opinionItemsController.js";
const router = Router();

router.post("/items", authMiddleware, postOpinionItems);
// router.put("/:id");
// router.delete("/:id");
export default router;
