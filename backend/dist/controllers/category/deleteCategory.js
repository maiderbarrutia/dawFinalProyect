"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = void 0;
const Category_1 = require("../../entities/Category");
const database_1 = __importDefault(require("../../config/database"));
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await database_1.default.getRepository(Category_1.Category).findOneBy({ category_id: parseInt(id) });
        if (!category) {
            res.status(404).json({ message: "Categoría no encontrada" });
            return;
        }
        await database_1.default.getRepository(Category_1.Category).remove(category);
        res.status(200).json({ message: "Categoría eliminada exitosamente" });
    }
    catch (error) {
        console.error("Error al eliminar categoría:", error);
        res.status(500).json({ message: "Error al eliminar categoría", error });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=deleteCategory.js.map