import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Users = sequelize.define(
  "usuarios",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contraseña: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true,
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

await Users.sync({ force: false });

export default Users;
