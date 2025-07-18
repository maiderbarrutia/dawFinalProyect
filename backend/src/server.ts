import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dataSource from "./config/database";
import activityRoutes from "./routes/activityRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import companyRoutes from "./routes/companyRoutes";
import registrationRoutes from "./routes/registrationRoutes";
import userDataRoutes from "./routes/userDataRoutes";
import { seedCategories } from "./seeds/seedCategories";
import { seedCompanies } from "./seeds/seedCompanies";
import { seedActivities } from "./seeds/seedActivities";
import { uploadImagePath, uploadVideoPath } from './config/resourcePaths';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

const startServer = async () => {
  try {
    // Conectar a la base de datos
    await dataSource.initialize();
    console.log("Conexión a la base de datos establecida.");

    // Ejecutar seeds
    await seedCategories(dataSource);
    await seedCompanies(dataSource);
    await seedActivities(dataSource);

    // Registrar las rutas
    app.use("/api/usuarios", userDataRoutes);
    app.use("/api/actividades", activityRoutes);
    app.use("/api/categorias", categoryRoutes);
    app.use("/api/empresas", companyRoutes);
    app.use("/api/inscripciones", registrationRoutes);

    app.use('/images', express.static(uploadImagePath));
    app.use('/videos', express.static(uploadVideoPath));

    // Iniciar el servidor
    const port = process.env.PORT || 3003;
    app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al iniciar el servidor:", error.message);
    } else {
      console.error("Error desconocido al iniciar el servidor:", error);
    }
    process.exit(1);
  }
};

startServer();
