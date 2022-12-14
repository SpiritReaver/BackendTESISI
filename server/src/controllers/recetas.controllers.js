import Recetas from "../models/recetas.models.js";
import TipoReceta from "../models/tiporecetas.models.js";
import Product from "../models/productos.models.js";
import ListaCompras from "../models/listacompras.models.js";

export const createReceta = async (req, res, next) => {
  try {
    const { titulo, descripcion, informacionNutricional, pasos, precioReceta } =
      req.body;
    const newReceta = await Recetas.create({
      titulo,
      descripcion,
      pasos,
      informacionNutricional,
      precioReceta,
    });
    res.json({ newReceta }).status(200);
    console.log("Receta creada");
  } catch (error) {
    next(error);
  }
};

export const getReceta = async (req, res, next) => {
  const { id } = req.params;
  try {
    const lista = await Recetas.findOne({
      attributes: [
        "id",
        "titulo",
        "descripcion",
        "informacionNutricional",
        "pasos",
        "precioReceta",
        "tiporecetasId",
      ],
      where: {
        id: id,
      },
      include: [
        {
          model: TipoReceta,
          as: "Tiporeceta",
          attributes: ["descripcion", "tipoReceta"],
        },
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

    if (lista) {
      res.json({ lista });
    } else {
      res.status(404).json({ message: "La receta no existe" });
    }
  } catch (error) {
    next(error);
  }
};

export const getRecetas = async (req, res, next) => {
  try {
    const RecetasAll = await Recetas.findAll({
      attributes: [
        "id",
        "titulo",
        "descripcion",
        "informacionNutricional",
        "pasos",
        "precioReceta",
        "tiporecetasId",
      ],
      include: [
        {
          model: TipoReceta,
          as: "Tiporeceta",
          attributes: ["descripcion", "tipoReceta"],
        },
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
    if (RecetasAll) {
      res.json({ RecetasAll });
    } else {
      res.status(404).json({ message: "No hay Recetas" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateReceta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      titulo,
      descripcion,
      informacionNutricional,
      pasos,
      precioReceta,
      tiporecetasId,
    } = req.body;

    const Receta = await Recetas.findOne({
      where: {
        id,
      },
    });
    if (Receta) {
      await Recetas.update(
        {
          titulo: titulo,
          descripcion: descripcion,
          informacionNutricional: informacionNutricional,
          pasos: pasos,
          precioReceta: precioReceta,
          tiporecetasId: tiporecetasId,
        },
        {
          where: { id: id },
        }
      );

      res.json({ "Receta Actualizada con ID:": req.params.id }).status(200);
    } else {
      res.status(404).json({ message: "Receta no encontrada" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteReceta = async (req, res, next) => {
  const { id } = req.params;
  try {
    const Receta = await Recetas.findOne({
      where: {
        id,
      },
    });
    if (Receta) {
      await Recetas.destroy({
        where: {
          id,
        },
      });
      res.json({ "Receta Eliminada con ID:": req.params.id }).status(204);
    } else {
      res.status(404).json({ message: "Receta no encontrada" });
    }
  } catch (error) {
    next(error);
  }
};

export const addProductoToReceta = async (req, res, next) => {
  try {
    const Receta = await Recetas.findOne({
      where: {
        id: req.params.id,
      },
    });

    const producto = await Product.findOne({
      where: {
        codProducto: req.body.codProducto,
      },
    });
    if (Receta && producto) {
      if (!(await Receta.hasProductos(producto))) {
        await Receta.addProductos(producto);
        res
          .json({
            message:
              "Producto: " +
              producto.producto +
              " fue agregado a la receta: " +
              Receta.titulo,
          })
          .status(200);
      } else {
        res
          .status(404)
          .json({ message: "El producto ya encuentra en la receta" });
      }
    } else {
      res.status(404).json({ message: "El producto o receta no existe" });
    }
  } catch (error) {
    next(error);
  }
};

export const removeProductoOnReceta = async (req, res, next) => {
  try {
    const Receta = await Recetas.findOne({
      where: {
        id: req.params.id,
      },
    });

    const producto = await Product.findOne({
      where: {
        codProducto: req.body.codProducto,
      },
    });
    if (Receta && producto) {
      if (await Receta.hasProductos(producto)) {
        await Receta.removeProductos(producto);
        res
          .json({
            message:
              "Producto: " +
              producto.producto +
              " fue eliminado de la receta: " +
              Receta.titulo,
          })
          .status(200);
      } else {
        res
          .status(404)
          .json({ message: "El producto no se encuentra en la receta" });
      }
    } else {
      res.status(404).json({ message: "El producto o receta no existe" });
    }
  } catch (error) {
    next(error);
  }
};

export const addTipoRecetaToReceta = async (req, res, next) => {
  try {
    const receta = await Recetas.findOne({
      where: {
        id: req.params.id,
      },
    });

    const Tiporeceta = await TipoReceta.findOne({
      where: {
        id: req.body.id,
      },
    });
    if (receta && Tiporeceta) {
      if (!(await Tiporeceta.hasReceta(receta))) {
        await Tiporeceta.addReceta(receta);
        res
          .json({
            message:
              "Tipo de receta: " +
              Tiporeceta.tipoReceta +
              " fue relacionado a la receta: " +
              receta.titulo,
          })
          .status(200);
      } else {
        res.status(404).json({
          message: "El tipo de receta ya esta relacionado con la receta",
        });
      }
    } else {
      res
        .status(404)
        .json({ message: "El producto o tipo de receta no existe" });
    }
  } catch (error) {
    next(error);
  }
};

export const removeTipoRecetaOnReceta = async (req, res, next) => {
  try {
    const Receta = await Recetas.findOne({
      where: {
        id: req.params.id,
      },
    });

    const Tiporeceta = await Product.findOne({
      where: {
        id: req.body.id,
      },
    });
    if (Receta && Tiporeceta) {
      if (await Receta.hasTipoReceta(Tiporeceta)) {
        await Receta.removeTipoReceta(Tiporeceta);
        res
          .json({
            message:
              "Tipo de receta: " +
              Tiporeceta.tipoReceta +
              " fue relacionado a la receta: " +
              Receta.titulo,
          })
          .status(200);
      } else {
        res.status(404).json({
          message: "El tipo de receta no esta relacionado con la receta",
        });
      }
    } else {
      res
        .status(404)
        .json({ message: "El producto o tipo de receta no existe" });
    }
  } catch (error) {
    next(error);
  }
};

export const ProductosRecetaToList = async (req, res, next) => {
  try {
    const receta = await Recetas.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (receta) {
      const newLista = await ListaCompras.create({});
      const productos = await receta.getProductos();
      let i = 0;

      productos.forEach(async (producto) => {
        i = i + producto.precio;
        await newLista.addProductos(producto);
      });

      await ListaCompras.update(
        {
          precioTotal: i,
        },
        {
          where: {
            id: newLista.id,
          },
        }
      );

      await res
        .json({
          message:
            "Lista de compras con productos creada con ID: " +
            newLista.id +
            "y precio total: " +
            i,
        })
        .status(200);
    } else {
      res.status(404).json({ message: "La receta no existe" });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  getReceta,
  createReceta,
  getRecetas,
  updateReceta,
  deleteReceta,
  addProductoToReceta,
  removeProductoOnReceta,
  addTipoRecetaToReceta,
  removeTipoRecetaOnReceta,
  ProductosRecetaToList,
};
