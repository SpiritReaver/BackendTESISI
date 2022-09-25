import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

const relacionProductosRecetas = sequelize.define(
  "relacionproductosrecetas",
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

await relacionProductosRecetas.sync();

export default relacionProductosRecetas;
