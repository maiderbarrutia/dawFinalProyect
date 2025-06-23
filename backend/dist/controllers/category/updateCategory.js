"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = void 0;
const Category_1 = require("../../entities/Category");
const database_1 = __importDefault(require("../../config/database"));
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const category = await database_1.default.getRepository(Category_1.Category).findOneBy({ category_id: parseInt(id) });
        if (!category) {
            res.status(404).json({ message: "Categoría no encontrada" });
            return;
        }
        const updatedCategory = database_1.default.getRepository(Category_1.Category).merge(category, updatedData);
        await database_1.default.getRepository(Category_1.Category).save(updatedCategory);
        res.status(200).json({ message: "Categoría actualizada exitosamente", updatedCategory });
    }
    catch (error) {
        console.error("Error al actualizar categoría:", error);
        res.status(500).json({ message: "Error al actualizar categoría", error });
    }
};
exports.updateCategory = updateCategory;
//# sourceMappingURL=updateCategory.js.map