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
    imagen: {
      type: DataTypes.STRING(500),
      defaultValue:
        "https://www.clara.es/medio/2022/07/26/canelones-de-verdura_d2aa4957_1280x720.jpg",
      allowNull: true,
    },
    pasos: {
      type: DataTypes.STRING(5000),
      allowNull: false,
    },
    informacionNutricional: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    precioPorcion: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    precioReceta: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    porciones: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
  }
);

await Recetas.sync({ force: false });

export default Recetas;
