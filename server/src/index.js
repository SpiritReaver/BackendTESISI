import app from "./app.js";
import { sequelize } from "./database/database.js";
import dotenv from "dotenv";
import "./models/productos.models.js";
import "./models/tiporecetas.models.js";
import "./models/listacompras.models.js";
import "./models/usuarios.models.js";
import "./models/recetas.models.js";
import "./models/relacionproductosrecetas.models.js";
import "./models/promedioprecios.models.js";
import "./models/relacionproductospromedio.models.js";
import "./models/relaciones.js";
import "./models/productoscompra.models.js";
import "./models/productoslista.models.js";
import https from "https";
import fs from "fs";

dotenv.config();

async function main() {
  try {
    console.log("conexion a DB satisfactoria a DB" + process.env.DB_DATABASE);
    await sequelize.sync({ force: false });
    https
      .createServer(
        {
          key: fs.readFileSync("key.pem"),
          cert: fs.readFileSync("cert.pem"),
        },
        app
      )
      .listen(443, function () {
        console.log("Server running on port 443");
      });
  } catch (error) {
    console.error("No se pudo conectar a la DB:", error);
  }
}

main();
