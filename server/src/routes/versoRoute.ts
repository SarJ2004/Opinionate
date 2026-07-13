import { Router, Request, Response } from "express";
import {
  setVersos,
  getVersos,
  getVerso,
  updateVerso,
  deleteVerso,
} from "../controllers/versoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Router();
router.get("/", authMiddleware, getVersos);
router.get("/:id", getVerso);
router.post("/", authMiddleware, setVersos);
router.put("/:id", authMiddleware, updateVerso);
router.delete("/:id", authMiddleware, deleteVerso);
export default router;
