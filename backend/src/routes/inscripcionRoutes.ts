import { Router } from "express";
import { getInscripciones } from "../controllers/inscripcion/getInscripciones";
import { getInscripcionById } from "../controllers/inscripcion/getInscripcionById";
import { createInscripcion } from "../controllers/inscripcion/createInscripcion";
import { updateInscripcion } from "../controllers/inscripcion/updateInscripcion";
import { deleteInscripcion } from "../controllers/inscripcion/deleteInscripcion";

const inscripcionRoutes = Router();

inscripcionRoutes.get("/", getInscripciones);
inscripcionRoutes.get("/:id", getInscripcionById);
inscripcionRoutes.post("/", createInscripcion);
inscripcionRoutes.put("/:id", updateInscripcion);
inscripcionRoutes.delete("/:id", deleteInscripcion);

export default inscripcionRoutes;