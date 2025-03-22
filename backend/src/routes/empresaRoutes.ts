import { Router } from "express";
import { getEmpresas } from "../controllers/empresa/getEmpresas";
import { getEmpresaById } from "../controllers/empresa/getEmpresaById";
import { createEmpresa } from "../controllers/empresa/createEmpresa";
import { updateEmpresa } from "../controllers/empresa/updateEmpresa";
import { deleteEmpresa } from "../controllers/empresa/deleteEmpresa";
import { loginEmpresa } from "../controllers/empresa/loginEmpresa";
import { authMiddleware } from "../middlewares/authMiddleware"; 


const empresaRoutes = Router();

empresaRoutes.post("/register", createEmpresa);
empresaRoutes.post("/login", loginEmpresa);

empresaRoutes.get("/", authMiddleware, getEmpresas);
empresaRoutes.get("/:id", authMiddleware, getEmpresaById);
empresaRoutes.post("/", authMiddleware, createEmpresa);
empresaRoutes.put("/:id", authMiddleware, updateEmpresa);
empresaRoutes.delete("/:id", authMiddleware, deleteEmpresa);

export default empresaRoutes;

