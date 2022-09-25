import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Productos = sequelize.define(
  "productos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    producto: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    codProducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaCaptura: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    fechaCreacion: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

await Productos.sync();

export default Productos;
