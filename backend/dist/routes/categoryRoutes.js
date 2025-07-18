"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getCategories_1 = require("../controllers/category/getCategories");
const getCategoryById_1 = require("../controllers/category/getCategoryById");
const createCategory_1 = require("../controllers/category/createCategory");
const updateCategory_1 = require("../controllers/category/updateCategory");
const deleteCategory_1 = require("../controllers/category/deleteCategory");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const categoriaRoutes = (0, express_1.Router)();
categoriaRoutes.get("/", getCategories_1.getCategories);
categoriaRoutes.get("/:id", getCategoryById_1.getCategoryById);
categoriaRoutes.post("/", authMiddleware_1.authMiddleware, createCategory_1.createCategory);
categoriaRoutes.put("/:id", authMiddleware_1.authMiddleware, updateCategory_1.updateCategory);
categoriaRoutes.delete("/:id", authMiddleware_1.authMiddleware, deleteCategory_1.deleteCategory);
exports.default = categoriaRoutes;
//# sourceMappingURL=categoryRoutes.js.map