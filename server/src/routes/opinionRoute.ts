import { Router, Request, Response } from "express";
import {
  setOpinions,
  getOpinions,
  getOpinion,
  updateOpinion,
  deleteOpinion,
} from "../controllers/opinionController.js";
const router = Router();
router.get("/", getOpinions);
router.get("/:id", getOpinion);
router.post("/", setOpinions);
router.put("/:id", updateOpinion);
router.delete("/:id", deleteOpinion);
export default router;
