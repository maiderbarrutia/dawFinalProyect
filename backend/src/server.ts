// import express from "express";
// import dotenv from "dotenv";
// import dataSource from "./config/database";
// import actividadRoutes from "./routes/actividadRoutes"; // Asegúrate de que el enrutador esté importado

// dotenv.config();

// const app = express();
// app.use(express.json());

// // Conexión a la base de datos
// dataSource
//   .initialize()
//   .then(() => console.log("Conexión a la base de datos establecida."))
//   .catch((error) => console.error("Error al conectar a la base de datos:", error));

// // Aquí es donde estás usando el enrutador en tu aplicación
// app.use("/api/actividades", actividadRoutes); // Usa el enrutador con el prefijo adecuado


// const port = process.env.PORT || 3001;
// app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));


import express, { Application } from "express";
import actividadRoutes from "./routes/actividadRoutes"; // Asegúrate de importar el enrutador

const app: Application = express();

// Middleware para analizar el cuerpo de las solicitudes (JSON, urlencoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar el enrutador de actividades
app.use("/api/actividades", actividadRoutes); // Definir la base de la ruta para las actividades

// Otros middlewares o rutas que puedas necesitar...

app.listen(3002, () => {
  console.log("Servidor en ejecución en http://localhost:3002");
});
