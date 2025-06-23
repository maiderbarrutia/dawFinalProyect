"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivities = void 0;
const Activity_1 = require("../../entities/Activity");
const database_1 = __importDefault(require("../../config/database"));
const getActivities = async (req, res) => {
    try {
        const actividades = await database_1.default.getRepository(Activity_1.Activity).find({
            relations: ["company", "category"],
        });
        res.status(200).json(actividades);
    }
    catch (error) {
        console.error("Error al obtener actividades:", error);
        res.status(500).json({ message: "Error al obtener actividades", error });
    }
};
exports.getActivities = getActivities;
//# sourceMappingURL=getActivities.js.map