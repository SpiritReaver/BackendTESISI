import { Router } from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUsers,
  deleteUser,
  getListasUsuario,
  addListaToUsuario,
  removeListaToUsuario,
} from "../controllers/users.controllers.js";
import { verifyToken, verifyUser } from "../validators/tokenVerifier.js";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUsers);
router.get("/:id/listascompras", verifyToken, verifyUser, getListasUsuario);
router.post("/:id/addlista", verifyToken, verifyUser, addListaToUsuario);
router.post("/:id/remlista", verifyToken, verifyUser, removeListaToUsuario);

export default router;
