import promedioPrecios from "../models/promedioprecios.models.js";
import Product from "../models/productos.models.js";

export const createPromedioPrecios = async (req, res, next) => {
  try {
    const { preciopromedio } = req.body;

    const newPromedioPrecio = await promedioPrecios.create({
      preciopromedio,
    });

    res.json({ newPromedioPrecio }).status(200);
    console.log("Promedio de precio creado");
  } catch (error) {
    next(error);
  }
};

export const getPromedioPrecio = async (req, res, next) => {
  const { id } = req.params;
  try {
    const PromedioPrecio = await promedioPrecios.findOne({
      where: {
        id: id,
      },
      attributes: ["preciopromedio", "fechaRegistroPromedio"],
      include: [
        {
          model: Product,
          as: "Producto",
          attributes: ["producto", "codProducto"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (PromedioPrecio) {
      res.json({ PromedioPrecio });
    } else {
      res.status(404).json({ message: "No existe la el promedio" });
    }
  } catch (error) {
    next(error);
  }
};

export const getPromedioPrecios = async (req, res, next) => {
  try {
    const AllPromedioPrecios = await promedioPrecios.findAll({
      attributes: ["preciopromedio", "fechaRegistroPromedio"],
      include: [
        {
          model: Product,
          as: "Producto",
          attributes: ["producto", "codProducto"],
          through: {
            attributes: [],
          },
        },
      ],
      order: [["id", "ASC"]],
    });
    if (AllPromedioPrecios) {
      res.json({ AllPromedioPrecios });
    } else {
      res.status(404).json({ message: "No hay promedios" });
    }
  } catch (error) {
    next(error);
  }
};

export const updatePromedioPrecio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { preciopromedio, fechaRegistroPromedio } = req.body;

    const PromedioPrecio = await promedioPrecios.findOne({
      where: {
        id,
      },
    });
    if (PromedioPrecio) {
      await promedioPrecios.update(
        {
          preciopromedio: preciopromedio,
          fechaRegistroPromedio: fechaRegistroPromedio,
        },
        {
          where: { id: id },
        }
      );

      res.json({ "Promedio Actualizado con ID:": req.params.id }).status(200);
    } else {
      res.status(404).json({ message: "Promedio no encontrado" });
    }
  } catch (error) {
    next(error);
  }
};

export const deletePromedioPrecio = async (req, res, next) => {
  const { id } = req.params;
  try {
    const PromedioPrecio = await promedioPrecios.findOne({
      where: {
        id,
      },
    });
    if (PromedioPrecio) {
      await promedioPrecios.destroy({
        where: {
          id,
        },
      });
      res.json({ "Promedio Eliminado con ID:": req.params.id }).status(204);
    } else {
      res.status(404).json({ message: "Promedio no encontrado" });
    }
  } catch (error) {
    next(error);
  }
};
export default {
  createPromedioPrecios,
  getPromedioPrecio,
  getPromedioPrecios,
  updatePromedioPrecio,
  deletePromedioPrecio,
};
