import express from "express";
import isTeacher from "../middleware/isTeacher.js";

import {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent
} from "../controllers/contentController.js";

const router = express.Router();

router.post("/add",  isTeacher, createContent);
router.get("/get",  getAllContent);
router.get("/:id", getContentById);
router.put("/:id", isTeacher, updateContent);
router.delete("/delete/:id", isTeacher, deleteContent);

export default router;
