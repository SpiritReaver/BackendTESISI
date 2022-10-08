import ProductosLista from "../models/productoslista.models.js";

export const createProductoLista = async (req, res, next) => {
  try {
    const { codProducto, producto, precio, cantidad, precioKilogramo } =
      req.body;
    const newProductoLista = await ProductosLista.create({
      codProducto,
      producto,
      precio,
      precioKilogramo,
      cantidad,
    });
    res.json({ newProductoLista }).status(200);
    console.log("Producto de Lista creado");
  } catch (error) {
    next(error);
  }
};

export const getProductosLista = async (req, res, next) => {
  try {
    const ProductosListaAll = await ProductosLista.findAll({
      attributes: [
        "id",
        "codProducto",
        "producto",
        "precio",
        "precioKilogramo",
        "cantidad",
        "completo",
        "listId",
      ],
      order: [["codProducto", "ASC"]],
    });

    if (ProductosListaAll) {
      res.json({ ProductosListaAll });
      console.log("Productos de lista obtenidos");
    } else {
      res.status(404).json({ message: "No hay productos de lista" });
    }
  } catch (error) {
    next(error);
  }
};

export const getProductoLista = async (req, res, next) => {
  const { id } = req.params;
  try {
    const ProductoLista = await ProductosLista.findOne({
      attributes: [
        "id",
        "codProducto",
        "producto",
        "precio",
        "precioKilogramo",
        "cantidad",
        "completo",
        "listId",
      ],
      where: {
        id: id,
      },
    });
    if (ProductoLista) {
      res.json({ ProductoLista });
    } else {
      res.status(404).json({ message: "Producto de lista no encontrado" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateProductoLista = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      codProducto,
      producto,
      precio,
      precioKilogramo,
      cantidad,
      completo,
      listId,
    } = req.body;

    const ProductoLista = await ProductosLista.findOne({
      where: {
        id: id,
      },
    });
    if (ProductoLista) {
      await ProductosLista.update(
        {
          codProducto: codProducto,
          producto: producto,
          precio: precio,
          precioKilogramo: precioKilogramo,
          cantidad: cantidad,
          completo: completo,
          listId: listId,
        },
        {
          where: { id: id },
        }
      );
      res
        .json({
          message:
            "Producto de Lista con ID: " + req.params.id + " actualizado ",
        })
        .status(200);
    } else {
      res.status(404).json({ message: "Producto de compra no encontrado" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProductoLista = async (req, res, next) => {
  const { id } = req.params;
  try {
    const ProductoLista = await ProductosLista.findOne({
      where: {
        id: id,
      },
    });
    if (ProductoLista) {
      await ProductosLista.destroy({
        where: {
          id: id,
        },
      });
      res
        .json({ "Producto de compra eliminado con ID:": req.params.id })
        .status(204);
    } else {
      res.status(404).json({ message: "Producto de compra no encontrado" });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  createProductoLista,
  getProductosLista,
  getProductoLista,
  updateProductoLista,
  deleteProductoLista,
};
