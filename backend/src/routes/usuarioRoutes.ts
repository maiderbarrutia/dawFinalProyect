import { Router } from "express";
import { getUsuarios } from "../controllers/usuario/getUsuarios";
import { getUsuarioById } from "../controllers/usuario/getUsuarioById";
import { createUsuario } from "../controllers/usuario/createUsuario";
import { updateUsuario } from "../controllers/usuario/updateUsuario";
import { deleteUsuario } from "../controllers/usuario/deleteUsuario";

const usuarioRoutes = Router();

usuarioRoutes.get("/", getUsuarios);
usuarioRoutes.get("/:id", getUsuarioById);
usuarioRoutes.post("/", createUsuario);
usuarioRoutes.put("/:id", updateUsuario);
usuarioRoutes.delete("/:id", deleteUsuario);

export default usuarioRoutes;