// import { Router } from "express";
// import { getActividad, createActividad } from "../controllers/actividadController";
// // import { getActividad } from "../controllers/getActividad";
// // import { createActividad } from "../controllers/createActividad";

// const actividadRoutes = Router();

// actividadRoutes.get("/", getActividad); // Obtener todas las actividades
// actividadRoutes.post("/", createActividad); // Crear una nueva actividad

// export default actividadRoutes;


import { Router } from "express";
import { getActividad, createActividad, getActividadById, updateActividad, deleteActividad } from "../controllers/actividadController";

const actividadRoutes = Router();

// Definición correcta de las rutas
actividadRoutes.get("/", getActividad); // Obtener todas las actividades
actividadRoutes.get("/:id", getActividadById); // Obtener una actividad por ID
actividadRoutes.post("/", createActividad); // Crear una nueva actividad
actividadRoutes.put("/:id", updateActividad); // Actualizar una actividad existente
actividadRoutes.delete("/:id", deleteActividad); // Eliminar una actividad

export default actividadRoutes;



