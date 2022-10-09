import Sequelize from "sequelize";
import db from "../config.js";

export const sequelize = new Sequelize(
  db.database, // db name,
  db.user, // username
  db.password, // password
  {
    host: db.host,
    dialect: db.dialect,
    port: db.port,
    charset: "utf8",
    dialectOptions: {
      ssl: true,
      native: true,
    },
  }
);

export default sequelize;
