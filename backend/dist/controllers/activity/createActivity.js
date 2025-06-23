"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActivity = void 0;
const Activity_1 = require("../../entities/Activity");
const Company_1 = require("../../entities/Company");
const Category_1 = require("../../entities/Category");
const database_1 = __importDefault(require("../../config/database"));
const createActivity = async (req, res) => {
    const { company_id, category_id, ...activityData } = req.body;
    // Recibe las imágenes subidas por multer
    const activityImages = req.files;
    try {
        // Verificar la empresa existe
        const company = await database_1.default.getRepository(Company_1.Company).findOne({ where: { company_id } });
        if (!company) {
            res.status(404).json({ message: 'Empresa no encontrada.' }); // Aquí enviamos un JSON
            return;
        }
        // Verificar si la categoría existe
        const category = await database_1.default.getRepository(Category_1.Category).findOne({ where: { category_id } });
        if (!category) {
            res.status(404).json({ message: 'Categoría no encontrada.' }); // Aquí enviamos un JSON
            return;
        }
        // Crear la actividad
        const activity = database_1.default.getRepository(Activity_1.Activity).create({
            ...activityData,
            company,
            category,
            activity_images: activityImages.map((file) => `${file.filename}`),
        });
        // Guardar la actividad en la base de datos
        await database_1.default.getRepository(Activity_1.Activity).save(activity);
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
};
exports.createActivity = createActivity;
//# sourceMappingURL=createActivity.js.map