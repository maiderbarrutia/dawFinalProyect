"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = void 0;
const Category_1 = require("../../entities/Category");
const database_1 = __importDefault(require("../../config/database"));
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const category = yield database_1.default.getRepository(Category_1.Category).findOneBy({ category_id: parseInt(id) });
        if (!category) {
            res.status(404).json({ message: "Categoría no encontrada" });
            return;
        }
        const updatedCategory = database_1.default.getRepository(Category_1.Category).merge(category, updatedData);
        yield database_1.default.getRepository(Category_1.Category).save(updatedCategory);
        res.status(200).json({ message: "Categoría actualizada exitosamente", updatedCategory });
    }
    catch (error) {
        console.error("Error al actualizar categoría:", error);
        res.status(500).json({ message: "Error al actualizar categoría", error });
    }
});
exports.updateCategory = updateCategory;
