"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRegistration = void 0;
const Registration_1 = require("../../entities/Registration");
const database_1 = __importDefault(require("../../config/database"));
const updateRegistration = async (req, res) => {
    const { id } = req.params;
    const { user_id, activity_id } = req.body;
    try {
        const registration = await database_1.default.getRepository(Registration_1.Registration).findOneBy({ registration_id: parseInt(id) });
        if (!registration) {
            res.status(404).json({ message: "Inscripción no encontrada" });
            return;
        }
        const updatedRegistration = database_1.default.getRepository(Registration_1.Registration).merge(registration, {
            userData: user_id ? { user_id: user_id } : undefined, // Actualiza si se proporciona un usuario_id
            activity: activity_id ? { activity_id: activity_id } : undefined, // Actualiza si se proporciona un actividad_id
        });
        await database_1.default.getRepository(Registration_1.Registration).save(updatedRegistration);
        res.status(200).json({ message: "Inscripción actualizada exitosamente", updatedRegistration });
    }
    catch (error) {
        console.error("Error al actualizar inscripción:", error);
        res.status(500).json({ message: "Error al actualizar inscripción", error });
    }
};
exports.updateRegistration = updateRegistration;
//# sourceMappingURL=updateRegistration.js.map