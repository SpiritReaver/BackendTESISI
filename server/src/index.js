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
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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
      .listen(4000, () => {
        console.log("servidor HTTPS corriendo en puerto " + 4000);
      });
    app.listen(4050),
      () => console.log("servidor HTTP corriendo en puerto " + 4050);
  } catch (error) {
    console.error("No se pudo conectar a la DB:", error);
  }
}

main();
