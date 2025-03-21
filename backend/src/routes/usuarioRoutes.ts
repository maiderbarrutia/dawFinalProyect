import { Router } from "express";
import { createUsuario, getUsuarioById, updateUsuario, deleteUsuario } from "../controllers/usuarioController";
import { getUsuarios } from "../controllers/usuario/getUsuarios";

const usuarioRoutes = Router();

usuarioRoutes.get("/", getUsuarios);
usuarioRoutes.get("/:id", getUsuarioById);
usuarioRoutes.post("/", createUsuario);
usuarioRoutes.put("/:id", updateUsuario);
usuarioRoutes.delete("/:id", deleteUsuario);

export default usuarioRoutes;