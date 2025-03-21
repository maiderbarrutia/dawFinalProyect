import { Router } from "express";
import { getCategorias } from "../controllers/categoria/getCategorias";
import { getCategoriaById } from "../controllers/categoria/getCategoriaById";
import { createCategoria } from "../controllers/categoria/createCategoria";
import { updateCategoria } from "../controllers/categoria/updateCategoria";
import { deleteCategoria } from "../controllers/categoria/deleteCategoria";

const categoriaRoutes = Router();

categoriaRoutes.get("/", getCategorias);
categoriaRoutes.get("/:id", getCategoriaById);
categoriaRoutes.post("/", createCategoria);
categoriaRoutes.put("/:id", updateCategoria);
categoriaRoutes.delete("/:id", deleteCategoria);

export default categoriaRoutes;