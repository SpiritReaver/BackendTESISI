import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const ListaCompras = sequelize.define(
  "listacompras",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    precioTotal: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    completa: {
      type: DataTypes.BOOLEAN(false),
      defaultValue: false,
      allowNull: false,
    },
    favorita: {
      type: DataTypes.BOOLEAN(false),
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

await ListaCompras.sync();

export default ListaCompras;
