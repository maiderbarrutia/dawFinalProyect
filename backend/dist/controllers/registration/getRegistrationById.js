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
exports.getRegistrationById = void 0;
const Registration_1 = require("../../entities/Registration");
const database_1 = __importDefault(require("../../config/database"));
const getRegistrationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const registration = yield database_1.default.getRepository(Registration_1.Registration).findOne({
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
});
exports.getRegistrationById = getRegistrationById;
