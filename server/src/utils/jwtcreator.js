import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
dotenv.config();

export const JWTgenerator = async (user_id) => {
  const payload = {
    user: user_id,
  };
  const JWT = await jwt.sign(payload, process.env.SECRET_JWT, {
    expiresIn: "1hr",
  });
  return JWT;
};

export default JWTgenerator;
