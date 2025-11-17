import express from "express";
const router = express.Router();
import {
  getIdeas,
  createIdea,
  getIdea,
  deleteIdea,
  updateIdea,
} from "../controllers/ideas.js";
import  {protect} from "../middleware/authMiddleware.js"

router.get("/", getIdeas);
router.post("/", protect,createIdea);
router.get("/:id", getIdea);
router.delete("/:id",protect, deleteIdea);
router.put("/:id",protect, updateIdea);
//Query parameters example: /ideas?limit=3
export default router;
