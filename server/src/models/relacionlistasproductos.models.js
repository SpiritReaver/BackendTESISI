import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

const relacionListasProductos = sequelize.define(
  "relacionlistasproductos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: false,
  }
);

await relacionListasProductos.sync();

export default relacionListasProductos;
