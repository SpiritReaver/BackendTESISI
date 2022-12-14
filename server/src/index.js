import app from "./app.js";
import { sequelize } from "./database/database.js";
import dotenv from "dotenv";
import "./models/productos.models.js";
import "./models/tiporecetas.models.js";
import "./models/listacompras.models.js";
import "./models/usuarios.models.js";
import "./models/recetas.models.js";
import "./models/relacionlistasproductos.models.js";
import "./models/relacionproductosrecetas.models.js";
import "./models/promedioprecios.models.js";
import "./models/relacionproductospromedio.models.js";
import "./models/relaciones.js";

dotenv.config();

async function main() {
  try {
    console.log("conexion a DB satisfactoria a DB" + process.env.DB_DATABASE);
    await sequelize.sync({ force: false });
    app.listen(4000);
    console.log("Server on port 4000");
  } catch (error) {
    console.error("No se pudo conectar a la DB:", error);
  }
}

main();
