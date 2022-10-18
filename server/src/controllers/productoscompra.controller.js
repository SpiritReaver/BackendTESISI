import Productos from "../models/productos.models.js";
import ProductosCompra from "../models/productoscompra.models.js";
import { sequelize } from "../database/database.js";
import Recetas from "../models/recetas.models.js";

export const createProductoCompra = async (req, res, next) => {
  try {
    const { codProducto, producto, precio, cantidad, precioKilogramo } =
      req.body;
    const newProductoCompra = await ProductosCompra.create({
      codProducto,
      producto,
      precio,
      precioKilogramo,
      cantidad,
    });
    res.json({ newProductoCompra }).status(200);
    console.log("Producto de Compra creado");
  } catch (error) {
    next(error);
  }
};

export const getProductosCompra = async (req, res, next) => {
  try {
    const ProductosCompraAll = await ProductosCompra.findAll({
      attributes: [
        "id",
        "codProducto",
        "producto",
        "precio",
        "precioKilogramo",
        "cantidad",
      ],
      order: [["codProducto", "ASC"]],
    });

    if (ProductosCompraAll) {
      res.json({ ProductosCompraAll });
      console.log("Productos de compra obtenidos");
    } else {
      res.status(404).json({ message: "No hay productos de compra" });
    }
  } catch (error) {
    next(error);
  }
};

export const getProductoCompra = async (req, res, next) => {
  const { id } = req.params;
  try {
    const ProductoCompra = await ProductosCompra.findOne({
      attributes: [
        "id",
        "codProducto",
        "producto",
        "precio",
        "precioKilogramo",
        "cantidad",
      ],
      where: {
        codProducto: id,
      },
    });
    if (ProductoCompra) {
      res.json({ ProductoCompra });
    } else {
      res.status(404).json({ message: "Producto de compra no encontrado" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateProductoCompra = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { codProducto, producto, precio, precioKilogramo, cantidad } =
      req.body;

    const ProductoCompra = await ProductosCompra.findOne({
      where: {
        codProducto: id,
      },
    });
    if (ProductoCompra) {
      await ProductosCompra.update(
        {
          codProducto: codProducto,
          producto: producto,
          cantidad: cantidad,
          precio: precio,
          precioKilogramo: precioKilogramo,
        },
        {
          where: { codProducto: id },
        }
      );
      await UpdatePricesAll(req);

      res
        .json({
          message:
            "Producto de compra: " +
            ProductoCompra.producto +
            " con ID: " +
            req.params.id +
            " actualizado ",
        })
        .status(200);
    } else {
      res.status(404).json({ message: "Producto de compra no encontrado" });
    }
  } catch (error) {
    next(error);
  }
};

async function UpdatePricesAll(req) {
  try {
    const Producto = await ProductosCompra.findOne({
      where: {
        codProducto: req.params.id,
      },
    });

    const recetas = [await Producto.getRecetas()];
    const recetasArray = recetas[0].map((receta) => receta.id);
    recetasArray.forEach(async (receta) => {
      console.log(receta);
      const Receta = await Recetas.findOne({
        where: {
          id: receta,
        },
      });

      const productos = await Receta.getProductos();
      let i = 0;

      productos.forEach(async (producto) => {
        i = i + producto.precio;
      });

      await Recetas.update(
        {
          precioPorcion: i,
          precioReceta: i * Receta.porciones,
        },
        {
          where: { id: receta },
        }
      );
    });

    await ProductosCompra.update(
      {
        precio: Producto.precioKilogramo * Producto.cantidad,
      },
      {
        where: { codProducto: req.params.id },
      }
    );
  } catch (error) {}
}

export const deleteProductoCompra = async (req, res, next) => {
  const { id } = req.params;
  try {
    const ProductoCompra = await ProductosCompra.findOne({
      where: {
        id: id,
      },
    });
    if (ProductoCompra) {
      await ProductosCompra.destroy({
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

export const exportProductos = async (req, res, next) => {
  try {
    const ProductosAll = await sequelize.query(
      'SELECT DISTINCT ON ("codProducto")"codProducto",producto,precio,"fechaCaptura" FROM productos WHERE "fechaCaptura" IN (SELECT max("fechaCaptura") FROM productos) GROUP BY productos."codProducto",producto,precio,"fechaCaptura"  ',
      {
        type: sequelize.QueryTypes.SELECT,
        raw: false,
        model: Productos,
        mapToModel: true,
      }
    );
    if (ProductosAll) {
      await ProductosAll.forEach(async (producto) => {
        await ProductosCompra.create({
          codProducto: producto.codProducto,
          producto: producto.producto,
          precio: producto.precio,
          precioKilogramo: producto.precio,
          fechaCaptura: producto.fechaCaptura,
        });
      });

      res.json({ message: "Productos de compra exportados correctamente" });
    } else {
      res.status(404).json({ message: "No hay productos que exportar" });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  createProductoCompra,
  getProductosCompra,
  getProductoCompra,
  updateProductoCompra,
  deleteProductoCompra,
  exportProductos,
};
