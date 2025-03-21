import { Router } from "express";
import { getInscripciones, createInscripcion, getInscripcionById, updateInscripcion, deleteInscripcion } from "../controllers/inscripcionController";

const inscripcionRoutes = Router();

inscripcionRoutes.get("/", getInscripciones);
inscripcionRoutes.get("/:id", getInscripcionById);
inscripcionRoutes.post("/", createInscripcion);
inscripcionRoutes.put("/:id", updateInscripcion);
inscripcionRoutes.delete("/:id", deleteInscripcion);

export default inscripcionRoutes;