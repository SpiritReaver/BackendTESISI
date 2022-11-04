import Productos from "../models/productos.models.js";
import PromedioPrecios from "../models/promedioprecios.models.js";
import { Op } from "sequelize";

export const createProducto = async (req, res, next) => {
  try {
    const { producto, codProducto, ciudad, precio } = req.body;
    const newProducto = await Productos.create({
      producto,
      codProducto,
      ciudad,
      precio,
    });
    res.json({ newProducto }).status(200);
    console.log("Producto creado");
  } catch (error) {
    next(error);
  }
};

export const getProductos = async (req, res, next) => {
  try {
    const ProductosAll = await Productos.findAll({
      attributes: [
        "id",
        "producto",
        "codProducto",
        "ciudad",
        "precio",
        "fechaCaptura",
      ],
      where: {
        fechaCaptura: {
          [Op.gte]: "2022-01-01",
        },
        ciudad: {
          [Op.eq]: "Bogotá, D.C., Corabastos",
        },
      },
      group: ["id", "codProducto"],
      order: [
        ["codProducto", "ASC"],
        ["fechaCaptura", "ASC"],
      ],
    });

    if (ProductosAll) {
      res.json({ ProductosAll });
      console.log("Productos obtenidos");
    } else {
      res.status(404).json({ message: "No hay productos" });
    }
  } catch (error) {
    next(error);
  }
};

export const getProducto = async (req, res, next) => {
  const { id } = req.params;
  try {
    const Producto = await Productos.findOne({
      attributes: ["id", "producto", "codProducto", "ciudad", "precio"],
      where: {
        id: id,
      },
    });
    if (Producto) {
      res.json({ Producto });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { producto, codProducto, ciudad, precio } = req.body;

    const Producto = await Productos.findOne({
      where: {
        id: id,
      },
    });
    if (Producto) {
      await Productos.update(
        {
          producto: producto,
          codProducto: codProducto,
          ciudad: ciudad,
          precio: precio,
        },
        {
          where: { id: id },
        }
      );

      res.json({ "Producto Actualizado con ID:": req.params.id }).status(200);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProducto = async (req, res, next) => {
  const { id } = req.params;
  try {
    const Producto = await Productos.findOne({
      where: {
        id,
      },
    });
    if (Producto) {
      await Productos.destroy({
        where: {
          id: id,
        },
      });
      res.json({ "Producto Eliminado con ID:": req.params.id }).status(204);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    next(error);
  }
};

export const GetPromedioPrecios = async (req, res, next) => {
  try {
    const productos = await Productos.findAll({
      where: {
        codProducto: req.params.codProducto,
      },
    });

    const producto = await Productos.findOne({
      where: {
        codProducto: req.params.codProducto,
      },
    });

    if (productos) {
      let i = 0;

      productos.forEach(async (producto) => {
        i = i + producto.precio;
      });
      const promedio = Math.round(i / productos.length);

      const PromedioPrecio = await PromedioPrecios.create({
        preciopromedio: promedio,
      });
      PromedioPrecio.addProducto(producto);

      await res.json({ PromedioPrecio });
    } else {
      res.status(404).json({ message: "La receta no existe" });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  createProducto,
  getProductos,
  getProducto,
  updateProducto,
  deleteProducto,
  GetPromedioPrecios,
};
