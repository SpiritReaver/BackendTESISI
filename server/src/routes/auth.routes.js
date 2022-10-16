import { Router } from "express";
import { Registro, Login } from "../controllers/auth.controllers.js";
import {
  verifyToken,
  verifyUser,
  getUser,
} from "../validators/tokenVerifier.js";

const router = Router();

router.post("/registro", Registro);
router.post("/login", Login);

router.get("/checkToken/:token", verifyToken, (req, res, next) => {
  res.json(true);
});

router.get("/checkUser", verifyToken, verifyUser, (req, res, next) => {
  res.json(true);
});

router.get("/getUser/:token", verifyToken, getUser);

export default router;
