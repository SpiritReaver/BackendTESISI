import { hashPassword, ValidPassword } from "../utils/bcrypt.js";
import JWTgenerator from "../utils/jwtcreator.js";
import { Users } from "../models/usuarios.models.js";

function validEmail(correo) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo);
}

export const Registro = async (req, res, next) => {
  try {
    const { nombre, apellido, correo, ciudad, telefono, contraseña } = req.body;

    if (
      ![nombre, apellido, correo, ciudad, telefono, contraseña].every(Boolean)
    ) {
      return res.status(401).json("Faltan credenciales en los campos");
    } else if (!validEmail(correo)) {
      return res.status(401).json("Correo Invalido");
    }

    const userExist = await Users.findOne({
      where: {
        correo: req.body.correo,
      },
    });

    if (userExist) {
      return res.status(401).json({ message: "Usuario ya existe" });
    } else {
      const hashedPassword = await hashPassword(contraseña);
      const newUser = await Users.create({
        nombre,
        apellido,
        correo,
        ciudad,
        telefono,
        contraseña: hashedPassword,
      });
      const token = await JWTgenerator(newUser.id);

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ token });
    }
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { correo, contraseña } = req.body;

    if (![correo, contraseña].every(Boolean)) {
      return res.status(401).json("Faltan credenciales en los campos");
    } else if (!validEmail(correo)) {
      return res.status(401).json("Correo Invalido");
    }

    const userExist = await Users.findOne({
      where: {
        correo: req.body.correo,
      },
    });

    if (userExist) {
      const validPassword = await ValidPassword(
        contraseña,
        userExist.contraseña
      );

      if (validPassword) {
        const token = await JWTgenerator({ id: userExist.id });

        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({ token });
      } else {
        return res
          .status(401)
          .json({ message: "Contraseña o Usuario incorrectos" });
      }
    } else {
      return res
        .status(401)
        .json({ message: "Contraseña o Usuario incorrectos" });
    }
  } catch (error) {
    next(error);
  }
};
