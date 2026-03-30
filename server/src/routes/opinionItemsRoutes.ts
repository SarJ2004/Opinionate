import { Router, Request, Response } from "express";
import {} from "../controllers/opinionController.js";
const router = Router();

router.post("/items");
router.put("/:id");
router.delete("/:id");
export default router;
