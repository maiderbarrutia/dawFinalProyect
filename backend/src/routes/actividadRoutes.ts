import { Router } from "express";
import { getActividades} from "../controllers/actividad/getActividades";
import { getActividadById} from "../controllers/actividad/getActividadById";
import { createActividad} from "../controllers/actividad/createActividad";
import { updateActividad} from "../controllers/actividad/updateActividad";
import { deleteActividad} from "../controllers/actividad/deleteActividad";
import { authMiddleware } from "../middlewares/authMiddleware";

const actividadRoutes = Router();

actividadRoutes.get("/", authMiddleware, getActividades);
actividadRoutes.get("/:id", authMiddleware, getActividadById);
actividadRoutes.post("/", authMiddleware, createActividad);
actividadRoutes.put("/:id", authMiddleware, updateActividad);
actividadRoutes.delete("/:id", authMiddleware, deleteActividad);

export default actividadRoutes;