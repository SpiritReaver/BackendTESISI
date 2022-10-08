import { Router } from "express";
import {
  createProductoCompra,
  getProductosCompra,
  getProductoCompra,
  updateProductoCompra,
  deleteProductoCompra,
  exportProductos,
} from "../controllers/productoscompra.controller.js";

const router = Router();

router.post("/", createProductoCompra);
router.get("/", getProductosCompra);
router.get("/:id", getProductoCompra);
router.put("/:id", updateProductoCompra);
router.delete("/:id", deleteProductoCompra);
router.post("/exportproducto", exportProductos);
export default router;
