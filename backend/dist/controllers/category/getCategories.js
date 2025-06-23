"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = void 0;
const Category_1 = require("../../entities/Category");
const database_1 = __importDefault(require("../../config/database"));
const getCategories = async (req, res) => {
    try {
        const categories = await database_1.default.getRepository(Category_1.Category).find();
        res.status(200).json(categories);
    }
    catch (error) {
        console.error("Error al obtener categorías:", error);
        res.status(500).json({ message: "Error al obtener categorías", error });
    }
};
exports.getCategories = getCategories;
//# sourceMappingURL=getCategories.js.map