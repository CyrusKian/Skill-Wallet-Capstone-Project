import express from "express";
import {
  createProperty,
  getProperties,
  getProperty,
  deleteProperty,
} from "../controllers/propertyControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getProperty);
router.post("/", protect, createProperty);
router.delete("/:id", protect, deleteProperty);

export default router;