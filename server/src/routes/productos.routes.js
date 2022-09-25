import { Router } from "express";
import {
  createProducto,
  getProductos,
  getProducto,
  updateProducto,
  deleteProducto,
  GetPromedioPrecios,
} from "../controllers/productos.controllers.js";

const router = Router();

router.post("/", createProducto);
router.get("/", getProductos);
router.get("/:id", getProducto);
router.put("/:id", updateProducto);
router.delete("/:id", deleteProducto);
router.post("/:codProducto/promedio", GetPromedioPrecios);
export default router;
