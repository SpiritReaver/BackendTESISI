import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const ProductosLista = sequelize.define(
  "productoslista",
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
    completo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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

await ProductosLista.sync();

export default ProductosLista;
