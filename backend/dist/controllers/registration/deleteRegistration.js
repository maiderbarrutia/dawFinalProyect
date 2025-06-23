"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRegistration = void 0;
const Registration_1 = require("../../entities/Registration");
const database_1 = __importDefault(require("../../config/database"));
const deleteRegistration = async (req, res) => {
    const { id } = req.params;
    try {
        const registration = await database_1.default.getRepository(Registration_1.Registration).findOneBy({ registration_id: parseInt(id) });
        if (!registration) {
            res.status(404).json({ message: "Inscripción no encontrada" });
            return;
        }
        await database_1.default.getRepository(Registration_1.Registration).remove(registration);
        res.status(200).json({ message: "Inscripción eliminada exitosamente" });
    }
    catch (error) {
        console.error("Error al eliminar inscripción:", error);
        res.status(500).json({ message: "Error al eliminar inscripción", error });
    }
};
exports.deleteRegistration = deleteRegistration;
//# sourceMappingURL=deleteRegistration.js.map