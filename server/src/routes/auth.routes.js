import { Router } from "express";
import { Registro, Login } from "../controllers/auth.controllers.js";
import { verifyToken, verifyUser } from "../validators/tokenVerifier.js";

const router = Router();

router.post("/registro", Registro);
router.post("/login", Login);

router.get("/checkToken", verifyToken, (req, res, next) => {
  res.json(true);
});

router.get("/checkUser/:id", verifyToken, verifyUser);

export default router;
