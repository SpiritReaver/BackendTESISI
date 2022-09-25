import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const TipoRecetas = sequelize.define(
  "tiporecetas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    tipoReceta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

await TipoRecetas.sync();

export default TipoRecetas;
