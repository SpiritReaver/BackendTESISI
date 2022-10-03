import ListaCompras from "../models/listacompras.models.js";
import Users from "../models/usuarios.models.js";
import Product from "../models/productos.models.js";

export const createLista = async (req, res, next) => {
  try {
    const { precioTotal, completa, favorita, userId } = req.body;

    const Usuario = await Users.findOne({
      where: {
        id: userId,
      },
    });

    if (Usuario) {
      const newLista = await ListaCompras.create({
        precioTotal,
        completa,
        favorita,
        userId,
      });

      res.json({ newLista }).status(200);
      console.log("Lista creada");
    } else {
      res
        .status(404)
        .json({ message: "El usuario asociado a la lista no existe" });
    }
  } catch (error) {
    next(error);
  }
};

export const getLista = async (req, res, next) => {
  const { id } = req.params;
  try {
    const Lista = await ListaCompras.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "precioTotal", "completa", "favorita", "userId"],
      include: [
        {
          model: Product,
          as: "Productos",
          attributes: ["producto", "precio"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (Lista) {
      res.json({ Lista });
    } else {
      res.status(404).json({ message: "No existe la lista" });
    }
  } catch (error) {
    next(error);
  }
};

export const getListas = async (req, res, next) => {
  try {
    const AllListas = await ListaCompras.findAll({
      attributes: ["id", "precioTotal", "completa", "favorita", "userId"],
      include: [
        {
          model: Product,
          as: "Productos",
          attributes: ["producto", "precio"],
          through: {
            attributes: [],
          },
        },
      ],
      order: [["id", "ASC"]],
    });
    if (AllListas) {
      res.json({ AllListas });
    } else {
      res.status(404).json({ message: "No hay listas" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateLista = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { precioTotal, completa, favorita, userId } = req.body;

    const Lista = await ListaCompras.findOne({
      where: {
        id: id,
      },
    });
    if (Lista) {
      await ListaCompras.update(
        {
          precioTotal: precioTotal,
          completa: completa,
          favorita: favorita,
          userId: userId,
        },
        {
          where: { id: id },
        }
      );

      res.json({ "Lista Actualizada con ID:": req.params.id }).status(200);
    } else {
      res.status(404).json({ message: "Lista no encontrada" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteLista = async (req, res, next) => {
  const { id } = req.params;
  try {
    const Lista = await ListaCompras.findOne({
      where: {
        id,
      },
    });
    if (Lista) {
      await ListaCompras.destroy({
        where: {
          id,
        },
      });
      res.json({ "Lista Eliminada con ID:": req.params.id }).status(204);
    } else {
      res.status(404).json({ message: "Lista no encontrada" });
    }
  } catch (error) {
    next(error);
  }
};

export const addProductoToList = async (req, res, next) => {
  try {
    const lista = await ListaCompras.findOne({
      where: {
        id: req.params.id,
      },
    });

    const producto = await Product.findOne({
      where: {
        codProducto: req.body.codProducto,
      },
    });
    if (lista && producto) {
      if (!(await lista.hasProductos(producto))) {
        await lista.addProductos(producto);
        res
          .json({
            message:
              "Producto: " +
              producto.producto +
              " fue agregado a lista con ID: " +
              lista.id,
          })
          .status(200);
      } else {
        res
          .status(404)
          .json({ message: "El producto ya encuentra en la lista" });
      }
    } else {
      res.status(404).json({ message: "El producto o lista no existe" });
    }
  } catch (error) {
    next(error);
  }
};

export const removeProductoOnList = async (req, res, next) => {
  try {
    const lista = await ListaCompras.findOne({
      where: {
        id: req.params.id,
      },
    });

    const producto = await Product.findOne({
      where: {
        codProducto: req.body.codProducto,
      },
    });
    if (lista && producto) {
      if (await lista.hasProductos(producto)) {
        await lista.removeProductos(producto);
        res
          .json({
            message:
              "Producto: " +
              producto.producto +
              " fue eliminado de la lista con ID: " +
              lista.id,
          })
          .status(200);
      } else {
        res
          .status(404)
          .json({ message: "El producto no se encuentra en la lista" });
      }
    } else {
      res.status(404).json({ message: "El producto o lista no existe" });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  createLista,
  getLista,
  getListas,
  updateLista,
  deleteLista,
  addProductoToList,
  removeProductoOnList,
};
