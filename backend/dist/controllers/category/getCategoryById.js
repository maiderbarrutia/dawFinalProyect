"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryById = void 0;
const Category_1 = require("../../entities/Category");
const database_1 = __importDefault(require("../../config/database"));
const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await database_1.default.getRepository(Category_1.Category).findOneBy({ category_id: parseInt(id) });
        if (!category) {
            res.status(404).json({ message: "Categoría no encontrada" });
            return;
        }
        res.status(200).json(category);
    }
    catch (error) {
        console.error("Error al obtener categoría:", error);
        res.status(500).json({ message: "Error al obtener categoría", error });
    }
};
exports.getCategoryById = getCategoryById;
//# sourceMappingURL=getCategoryById.js.map