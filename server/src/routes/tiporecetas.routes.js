import { Router } from "express";
import {
  createTipoReceta,
  getTipoReceta,
  getTipoRecetas,
  updateTipoReceta,
  deleteLista,
} from "../controllers/tiporecetas.controllers.js";

const router = Router();

router.post("/", createTipoReceta);
router.get("/:id", getTipoReceta);
router.get("/", getTipoRecetas);
router.put("/:id", updateTipoReceta);
router.delete("/:id", deleteLista);

export default router;
