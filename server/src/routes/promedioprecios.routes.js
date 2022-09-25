import { Router } from "express";
import {
  createPromedioPrecios,
  getPromedioPrecio,
  getPromedioPrecios,
  updatePromedioPrecio,
  deletePromedioPrecio,
} from "../controllers/promedioprecios.controllers.js";

const router = Router();

router.post("/", createPromedioPrecios);
router.get("/:id", getPromedioPrecio);
router.get("/", getPromedioPrecios);
router.put("/:id", updatePromedioPrecio);
router.delete("/:id", deletePromedioPrecio);

export default router;
