import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dataSource from "./config/database";
import actividadRoutes from "./routes/actividadRoutes";
import categoriaRoutes from "./routes/categoriaRoutes";
import empresaRoutes from "./routes/empresaRoutes";
import inscripcionRoutes from "./routes/inscripcionRoutes";
import usuarioRoutes from "./routes/usuarioRoutes";
import { seedCategorias } from "./seeds/seedCategorias";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

const startServer = async () => {
  try {
    // Conectar a la base de datos
    await dataSource.initialize();
    console.log("Conexión a la base de datos establecida.");

    // Ejecutar el seed de categorías
    await seedCategorias(dataSource);
    console.log("Seed de categorías ejecutado exitosamente.");

    // Registrar las rutas
    app.use("/api/usuarios", usuarioRoutes);
    app.use("/api/actividades", actividadRoutes);
    app.use("/api/categorias", categoriaRoutes);
    app.use("/api/empresas", empresaRoutes);
    app.use("/api/inscripciones", inscripcionRoutes);

    // Iniciar el servidor
    const port = process.env.PORT || 3003;
    app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
};

startServer();
