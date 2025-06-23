"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistrations = void 0;
const Registration_1 = require("../../entities/Registration");
const database_1 = __importDefault(require("../../config/database"));
const getRegistrations = async (req, res) => {
    try {
        const registrations = await database_1.default.getRepository(Registration_1.Registration).find({
            relations: ["userData", "activity"],
        });
        res.status(200).json(registrations);
    }
    catch (error) {
        console.error("Error al obtener inscripciones:", error);
        res.status(500).json({ message: "Error al obtener inscripciones", error });
    }
};
exports.getRegistrations = getRegistrations;
//# sourceMappingURL=getRegistrations.js.map