"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivityById = void 0;
const Activity_1 = require("../../entities/Activity");
const database_1 = __importDefault(require("../../config/database"));
const getActivityById = async (req, res) => {
    const { id } = req.params;
    try {
        const activity = await database_1.default.getRepository(Activity_1.Activity).findOne({
            where: { activity_id: parseInt(id) },
            relations: ["company", "category"],
        });
        if (!activity) {
            res.status(404).json({ message: "Actividad no encontrada" });
            return;
        }
        res.status(200).json(activity);
    }
    catch (error) {
        console.error("Error al obtener actividad:", error);
        res.status(500).json({ message: "Error al obtener actividad", error });
    }
};
exports.getActivityById = getActivityById;
//# sourceMappingURL=getActivityById.js.map