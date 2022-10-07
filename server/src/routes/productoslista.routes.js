import { Router } from "express";
import {
  createProductoLista,
  getProductosLista,
  getProductoLista,
  updateProductoLista,
  deleteProductoLista,
} from "../controllers/productoslista.controller.js";

const router = Router();

router.post("/", createProductoLista);
router.get("/", getProductosLista);
router.get("/:id", getProductoLista);
router.put("/:id", updateProductoLista);
router.delete("/:id", deleteProductoLista);
export default router;
