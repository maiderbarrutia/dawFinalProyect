import { Router } from "express";
import { getCategories } from "../controllers/category/getCategories";
import { getCategoryById } from "../controllers/category/getCategoryById";
import { createCategory } from "../controllers/category/createCategory";
import { updateCategory } from "../controllers/category/updateCategory";
import { deleteCategory } from "../controllers/category/deleteCategory";
import { authMiddleware } from "../middlewares/authMiddleware";

const categoriaRoutes = Router();

categoriaRoutes.get("/", getCategories);
categoriaRoutes.get("/:id", getCategoryById);
categoriaRoutes.post("/", authMiddleware, createCategory);
categoriaRoutes.put("/:id", authMiddleware, updateCategory);
categoriaRoutes.delete("/:id", authMiddleware, deleteCategory);

export default categoriaRoutes;