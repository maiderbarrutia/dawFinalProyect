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
exports.updateActivity = void 0;
const Activity_1 = require("../../entities/Activity");
const database_1 = __importDefault(require("../../config/database"));
const updateActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const activity = yield database_1.default.getRepository(Activity_1.Activity).findOneBy({ activity_id: parseInt(id) });
        if (!activity) {
            res.status(404).json({ message: "Actividad no encontrada" });
            return;
        }
        const updatedActivity = database_1.default.getRepository(Activity_1.Activity).merge(activity, Object.assign(Object.assign({}, updatedData), { company: updatedData.company_id ? { id_company: updatedData.company_id } : undefined, category: updatedData.category_id ? { id_category: updatedData.category_id } : undefined }));
        yield database_1.default.getRepository(Activity_1.Activity).save(updatedActivity);
        res.status(200).json({ message: "Actividad actualizada exitosamente", updatedActivity });
    }
    catch (error) {
        console.error("Error al actualizar actividad:", error);
        res.status(500).json({ message: "Error al actualizar actividad", error });
    }
});
exports.updateActivity = updateActivity;
