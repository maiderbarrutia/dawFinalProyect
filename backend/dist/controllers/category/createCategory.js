"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = void 0;
const Category_1 = require("../../entities/Category");
const database_1 = __importDefault(require("../../config/database"));
const createCategory = async (req, res) => {
    const { category_name, ...categoryData } = req.body;
    // Verificar si el nombre de la categoría existe
    if (!category_name) {
        res.status(400).json({
            message: "El campo nombre_categoria es obligatorio.",
        });
        return;
    }
    try {
        // Crear la nueva categoría
        const category = database_1.default.getRepository(Category_1.Category).create({
            ...categoryData
        });
        // Guardar la nueva categoría en la base de datos
        const newCategory = await database_1.default.getRepository(Category_1.Category).save(category);
        // Devolver la categoría creada
        res.status(201).json({
            message: "Categoría creada exitosamente",
            category: newCategory,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error al crear categoría:", error.message);
            res.status(500).json({ message: "Error al crear la categoría.", error: error.message });
        }
        else {
            console.error("Error desconocido al crear la categoría", error);
            res.status(500).json({ message: "Error desconocido al crear la categoría" });
        }
    }
};
exports.createCategory = createCategory;
//# sourceMappingURL=createCategory.js.map