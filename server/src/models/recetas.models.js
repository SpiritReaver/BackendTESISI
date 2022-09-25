import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Recetas = sequelize.define(
  "recetas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(3000),
      allowNull: false,
    },
    pasos: {
      type: DataTypes.STRING(5000),
      allowNull: false,
    },
    informacionNutricional: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    precioReceta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

await Recetas.sync({ force: false });

export default Recetas;
