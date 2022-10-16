import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) {
    return next(createError(401, "No esta autorizado"));
  }

  jwt.verify(token, process.env.SECRET_JWT, (err, user) => {
    if (err) return next(createError(403, "token invalido"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  const reqid = Number(req.cookies.ID);
  const Idtext = req.user.user.id;
  console.log(reqid, Idtext);
  if (reqid !== Idtext) {
    return next(createError(401, "No esta autorizado"));
  } else {
    next();
  }
};
