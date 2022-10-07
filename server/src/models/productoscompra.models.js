import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const ProductosCompra = sequelize.define(
  "productoscompra",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codProducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    producto: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precioKilogramo: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    fechaCaptura: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

await ProductosCompra.sync();

export default ProductosCompra;
