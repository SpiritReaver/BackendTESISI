import { Users } from "../models/usuarios.models.js";
import { hashPassword } from "../utils/bcrypt.js";
import ListaCompras from "../models/listacompras.models.js";
import Productos from "../models/productos.models.js";

export async function createUser(req, res, next) {
  try {
    const { nombre, apellido, correo, ciudad, telefono } = req.body;
    let { contraseña } = req.body;
    contraseña = await hashPassword(contraseña);
    console.log(contraseña);
    const newUser = await Users.create({
      nombre,
      apellido,
      contraseña,
      correo,
      ciudad,
      telefono,
    });
    res.json(newUser);
    console.log("Usuario creado");
  } catch (error) {
    next(error);
  }
}

export async function getUsers(req, res, next) {
  try {
    const UsersAll = await Users.findAll({
      attributes: ["id", "nombre", "apellido", "correo", "ciudad", "telefono"],
      order: [["id", "DESC"]],
    });

    if (UsersAll) {
      res.json(UsersAll);
      console.log("Usuarios obtenidos");
    } else {
      res.status(404).json({ message: "No hay usuarios" });
    }
  } catch (error) {
    next(error);
  }
}

export async function getUser(req, res, next) {
  const { id } = req.params;
  try {
    const User = await Users.findOne({
      where: {
        id,
      },
    });

    if (User) {
      res.json(User);
    } else {
      res.status(404).json({ message: "El usuario no existe" });
    }
  } catch (error) {
    next(error);
  }
}

export const updateUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, correo, ciudad, telefono } = req.body;

    const User = await Users.findOne({
      where: {
        id,
      },
    });

    if (User) {
      await Users.update(
        {
          nombre: nombre,
          apellido: apellido,
          correo: correo,
          ciudad: ciudad,
          telefono: telefono,
        },
        {
          where: { id: id },
        }
      );
      res.json({ "Usuario Actualizado con ID:": id }).status(200);
    } else {
      res.status(404).json({ message: "El usuario no existe" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const User = await Users.findOne({
      where: {
        id,
      },
    });

    if (User) {
      await Users.destroy({
        where: {
          id,
        },
      });
      res.json({ "Usuario Eliminado con ID:": id }).status(204);
    } else {
      res.status(404).json({ message: "El usuario no existe" });
    }
  } catch (error) {
    next(error);
  }
};

export const getListasUsuario = async (req, res, next) => {
  const { id } = req.params;
  try {
    const User = await Users.findOne({
      where: {
        id,
      },
    });

    if (User) {
      const listasCompras = await ListaCompras.findAll({
        where: {
          userId: id,
        },
        include: [
          {
            model: Productos,
            as: "Productos",
            attributes: ["producto", "precio"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      if (listasCompras) {
        res.json({ listasCompras }).status(200);
      } else {
        res
          .status(404)
          .json({ message: "El usuario no tiene listas de compras" });
      }
    } else {
      res.status(404).json({ message: "El usuario no existe" });
    }
  } catch (error) {
    next(error);
  }
};

export const addListaToUsuario = async (req, res, next) => {
  try {
    const usuario = await Users.findByPk(req.params.id);

    const lista = await ListaCompras.create({
      precioTotal: req.body.precioTotal,
      completa: req.body.completa,
      favorita: req.body.favorita,
    });

    if (usuario) {
      await lista.setUsers(usuario);
      res
        .json({
          message:
            "Lista indexada correctamente al usuario con ID: " + usuario.id,
        })
        .status(200);
    } else {
      res.status(404).json({ message: "la lista ya pertenece al usuario" });
    }
  } catch (error) {
    next(error);
  }
};

export const removeListaToUsuario = async (req, res, next) => {
  try {
    const usuario = await Users.findByPk(req.params.id);

    const lista = await ListaCompras.findByPk(req.body.id);

    if (usuario && lista && (await usuario.hasListas(lista))) {
      await usuario.removeListas(lista);
      await ListaCompras.destroy({
        where: {
          id: req.body.id,
        },
      });
      res
        .json({
          message: "Lista desvinculada del usuario con ID:  " + usuario.id,
        })
        .status(200);
    } else {
      res.status(404).json({ message: "El usuario o lista no existen" });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUsers,
  deleteUser,
  getListasUsuario,
  addListaToUsuario,
  removeListaToUsuario,
};
