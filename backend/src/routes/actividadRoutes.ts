import { Router } from "express";
import { getActividades, createActividad, getActividadById, updateActividad, deleteActividad } from "../controllers/actividadController";
import { authMiddleware } from "../middlewares/authMiddleware";

const actividadRoutes = Router();

actividadRoutes.get("/", authMiddleware, getActividades);
actividadRoutes.get("/:id", authMiddleware, getActividadById);
actividadRoutes.post("/", authMiddleware, createActividad);
actividadRoutes.put("/:id", authMiddleware, updateActividad);
actividadRoutes.delete("/:id", authMiddleware, deleteActividad);

export default actividadRoutes;