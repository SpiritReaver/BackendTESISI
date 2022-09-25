import { Router } from "express";
import {
  createReceta,
  getReceta,
  getRecetas,
  updateReceta,
  deleteReceta,
  addProductoToReceta,
  removeProductoOnReceta,
  addTipoRecetaToReceta,
  removeTipoRecetaOnReceta,
  ProductosRecetaToList,
} from "../controllers/recetas.controllers.js";

const router = Router();

router.post("/", createReceta);
router.get("/:id", getReceta);
router.get("/", getRecetas);
router.put("/:id", updateReceta);
router.delete("/:id", deleteReceta);
router.post("/:id/addproducto", addProductoToReceta);
router.post("/:id/remproducto", removeProductoOnReceta);
router.post("/:id/addtipo", addTipoRecetaToReceta);
router.post("/:id/remtipo", removeTipoRecetaOnReceta);
router.post("/:id/recetatolist", ProductosRecetaToList);

export default router;
