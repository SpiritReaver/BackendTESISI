import { Router } from "express";
import {
  createLista,
  getLista,
  getListas,
  updateLista,
  deleteLista,
  addProductoToList,
  removeProductoOnList,
} from "../controllers/listacompras.controllers.js";

const router = Router();

router.post("/", createLista);
router.get("/:id", getLista);
router.get("/", getListas);
router.put("/:id", updateLista);
router.delete("/:id", deleteLista);
router.get("/:id", deleteLista);
router.put("/:id/addproducto", addProductoToList);
router.put("/:id/remproducto", removeProductoOnList);

export default router;
