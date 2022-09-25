import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const PromedioPrecios = sequelize.define(
  "promedioprecios",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    preciopromedio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaRegistroPromedio: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

await PromedioPrecios.sync();

export default PromedioPrecios;
