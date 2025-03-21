import { Router } from "express";
import { getEmpresas } from "../controllers/empresa/getEmpresas";
import { getEmpresaById } from "../controllers/empresa/getEmpresaById";
import { createEmpresa } from "../controllers/empresa/createEmpresa";
import { updateEmpresa } from "../controllers/empresa/updateEmpresa";
import { deleteEmpresa } from "../controllers/empresa/deleteEmpresa";


const empresaRoutes = Router();

empresaRoutes.get("/", getEmpresas);
empresaRoutes.get("/:id", getEmpresaById);
empresaRoutes.post("/", createEmpresa);
empresaRoutes.put("/:id", updateEmpresa);
empresaRoutes.delete("/:id", deleteEmpresa);

export default empresaRoutes;

