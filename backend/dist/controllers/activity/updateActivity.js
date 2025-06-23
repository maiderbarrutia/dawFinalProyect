"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateActivity = void 0;
const Activity_1 = require("../../entities/Activity");
const database_1 = __importDefault(require("../../config/database"));
const updateActivity = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const activity = await database_1.default.getRepository(Activity_1.Activity).findOneBy({ activity_id: parseInt(id) });
        if (!activity) {
            res.status(404).json({ message: "Actividad no encontrada" });
            return;
        }
        const updatedActivity = database_1.default.getRepository(Activity_1.Activity).merge(activity, {
            ...updatedData,
            company: updatedData.company_id ? { id_company: updatedData.company_id } : undefined,
            category: updatedData.category_id ? { id_category: updatedData.category_id } : undefined,
        });
        await database_1.default.getRepository(Activity_1.Activity).save(updatedActivity);
        res.status(200).json({ message: "Actividad actualizada exitosamente", updatedActivity });
    }
    catch (error) {
        console.error("Error al actualizar actividad:", error);
        res.status(500).json({ message: "Error al actualizar actividad", error });
    }
};
exports.updateActivity = updateActivity;
//# sourceMappingURL=updateActivity.js.map