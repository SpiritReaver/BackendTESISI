import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

const relacionProductosPromedio = sequelize.define(
  "relacionproductospromedio",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fechaTomaPromedio: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

await relacionProductosPromedio.sync();

export default relacionProductosPromedio;
