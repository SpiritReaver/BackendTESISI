import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import listacomprasRoutes from "./routes/listacompras.routes.js";
import recetasRoutes from "./routes/recetas.routes.js";
import tiporecetasRoutes from "./routes/tiporecetas.routes.js";
import promediopreciosRoutes from "./routes/promedioprecios.routes.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/listacompras", listacomprasRoutes);
app.use("/api/recetas", recetasRoutes);
app.use("/api/tiporecetas", tiporecetasRoutes);
app.use("/api/promedioprecios", promediopreciosRoutes);

app.use((error, req, res, next) => {
  return res.status(500).json({ message: error.message });
});

export default app;
