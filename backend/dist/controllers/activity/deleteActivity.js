"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActivity = void 0;
const Activity_1 = require("../../entities/Activity");
const database_1 = __importDefault(require("../../config/database"));
const deleteActivity = async (req, res) => {
    const { id } = req.params;
    try {
        const activity = await database_1.default.getRepository(Activity_1.Activity).findOneBy({ activity_id: parseInt(id) });
        if (!activity) {
            res.status(404).json({ message: "Actividad no encontrada" });
            return;
        }
        await database_1.default.getRepository(Activity_1.Activity).remove(activity);
        res.status(200).json({ message: "Actividad eliminada exitosamente" });
    }
    catch (error) {
        console.error("Error al eliminar actividad:", error);
        res.status(500).json({ message: "Error al eliminar actividad", error });
    }
};
exports.deleteActivity = deleteActivity;
//# sourceMappingURL=deleteActivity.js.map