"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistrationById = void 0;
const Registration_1 = require("../../entities/Registration");
const database_1 = __importDefault(require("../../config/database"));
const getRegistrationById = async (req, res) => {
    const { id } = req.params;
    try {
        const registration = await database_1.default.getRepository(Registration_1.Registration).findOne({
            where: { registration_id: parseInt(id) },
            relations: ["userData", "activity"],
        });
        if (!registration) {
            res.status(404).json({ message: "Inscripción no encontrada" });
            return;
        }
        res.status(200).json(registration);
    }
    catch (error) {
        console.error("Error al obtener inscripción:", error);
        res.status(500).json({ message: "Error al obtener inscripción", error });
    }
};
exports.getRegistrationById = getRegistrationById;
//# sourceMappingURL=getRegistrationById.js.map