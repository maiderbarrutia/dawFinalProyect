import { Router } from "express";
import { getCategories } from "../controllers/category/getCategories";
import { getCategoryById } from "../controllers/category/getCategoryById";
import { createCategory } from "../controllers/category/createCategory";
import { updateCategory } from "../controllers/category/updateCategory";
import { deleteCategory } from "../controllers/category/deleteCategory";

const categoriaRoutes = Router();

categoriaRoutes.get("/", getCategories);
categoriaRoutes.get("/:id", getCategoryById);
categoriaRoutes.post("/", createCategory);
categoriaRoutes.put("/:id", updateCategory);
categoriaRoutes.delete("/:id", deleteCategory);

export default categoriaRoutes;