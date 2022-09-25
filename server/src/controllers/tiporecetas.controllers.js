import tiporeceta from "../models/tiporecetas.models.js";

export const createTipoReceta = async (req, res, next) => {
  try {
    const { descripcion, tipoReceta } = req.body;

    const newTipoReceta = await tiporeceta.create({
      descripcion,
      tipoReceta,
    });

    res.json({ newTipoReceta }).status(200);
    console.log("Tipo de receta creada");
  } catch (error) {
    next(error);
  }
};

export const getTipoReceta = async (req, res, next) => {
  const { id } = req.params;
  try {
    const TipoReceta = await tiporeceta.findOne({
      where: {
        id: id,
      },
      attributes: ["descripcion", "tipoReceta"],
    });

    if (TipoReceta) {
      res.json({ TipoReceta });
    } else {
      res.status(404).json({ message: "No existe la lista" });
    }
  } catch (error) {
    next(error);
  }
};

export const getTipoRecetas = async (req, res, next) => {
  try {
    const AllTipoRecetas = await tiporeceta.findAll({
      attributes: ["descripcion", "tipoReceta"],
      order: [["id", "ASC"]],
    });
    if (AllTipoRecetas) {
      res.json({ AllTipoRecetas });
    } else {
      res.status(404).json({ message: "No hay listas" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateTipoReceta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { descripcion, tipoReceta } = req.body;

    const Tiporeceta = await tiporeceta.findOne({
      where: {
        id,
      },
    });
    if (Tiporeceta) {
      await tiporeceta.update(
        {
          descripcion: descripcion,
          tipoReceta: tipoReceta,
        },
        {
          where: { id: id },
        }
      );

      res
        .json({ "Tipo de receta Actualizada con ID:": req.params.id })
        .status(200);
    } else {
      res.status(404).json({ message: "Tipo de receta no encontrada" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteLista = async (req, res, next) => {
  const { id } = req.params;
  try {
    const tipoReceta = await tiporeceta.findOne({
      where: {
        id,
      },
    });
    if (tipoReceta) {
      await tiporeceta.destroy({
        where: {
          id,
        },
      });
      res
        .json({ "Tipo de receta Eliminada con ID:": req.params.id })
        .status(204);
    } else {
      res.status(404).json({ message: "Tipo de receta  no encontrada" });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  getTipoReceta,
  createTipoReceta,
  getTipoRecetas,
  updateTipoReceta,
  deleteLista,
};
