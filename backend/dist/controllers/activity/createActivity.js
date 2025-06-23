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
exports.createActivity = void 0;
const Activity_1 = require("../../entities/Activity");
const Company_1 = require("../../entities/Company");
const Category_1 = require("../../entities/Category");
const database_1 = __importDefault(require("../../config/database"));
const createActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { company_id, category_id } = _a, activityData = __rest(_a, ["company_id", "category_id"]);
    // Recibe las imágenes subidas por multer
    const activityImages = req.files;
    try {
        // Verificar la empresa existe
        const company = yield database_1.default.getRepository(Company_1.Company).findOne({ where: { company_id } });
        if (!company) {
            res.status(404).json({ message: 'Empresa no encontrada.' }); // Aquí enviamos un JSON
            return;
        }
        // Verificar si la categoría existe
        const category = yield database_1.default.getRepository(Category_1.Category).findOne({ where: { category_id } });
        if (!category) {
            res.status(404).json({ message: 'Categoría no encontrada.' }); // Aquí enviamos un JSON
            return;
        }
        // Crear la actividad
        const activity = database_1.default.getRepository(Activity_1.Activity).create(Object.assign(Object.assign({}, activityData), { company,
            category, activity_images: activityImages.map((file) => `${file.filename}`) }));
        // Guardar la actividad en la base de datos
        yield database_1.default.getRepository(Activity_1.Activity).save(activity);
        // Devolver la actividad creada
        res.status(201).json({ message: "Actividad creada exitosamente", activity });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error al crear actividad:", error.message);
            res.status(500).json({ message: "Error al crear actividad.", error: error.message }); // JSON de error
        }
        else {
            console.error("Error desconocido al crear actividad", error);
            res.status(500).json({ message: "Error desconocido al crear actividad" }); // JSON de error
        }
    }
});
exports.createActivity = createActivity;
