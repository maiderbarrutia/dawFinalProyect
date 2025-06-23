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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = void 0;
const Category_1 = require("../../entities/Category");
const database_1 = __importDefault(require("../../config/database"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { category_name } = _a, categoryData = __rest(_a, ["category_name"]);
    // Verificar si el nombre de la categoría existe
    if (!category_name) {
        res.status(400).json({
            message: "El campo nombre_categoria es obligatorio.",
        });
        return;
    }
    try {
        // Crear la nueva categoría
        const category = database_1.default.getRepository(Category_1.Category).create(Object.assign({}, categoryData));
        // Guardar la nueva categoría en la base de datos
        const newCategory = yield database_1.default.getRepository(Category_1.Category).save(category);
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
});
exports.createCategory = createCategory;
