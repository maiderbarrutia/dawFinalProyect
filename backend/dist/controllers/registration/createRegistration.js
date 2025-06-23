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
exports.createRegistration = void 0;
const Registration_1 = require("../../entities/Registration");
const database_1 = __importDefault(require("../../config/database"));
const UserData_1 = require("../../entities/UserData");
const Activity_1 = require("../../entities/Activity");
const createRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, activity_id, registration_date } = req.body;
    // Validar de campos obligatorios
    if (!user_id || !activity_id || !registration_date) {
        res.status(400).json({ message: "Faltan parámetros requeridos" });
        return;
    }
    // Validación del activity_id: asegurarse de que sea un número válido
    if (isNaN(Number(activity_id))) {
        res.status(400).json({ message: "ID de actividad no válido" });
        return;
    }
    try {
        // Verificar si el usuario existe
        const user = yield database_1.default.getRepository(UserData_1.UserData).findOneBy({ user_id });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        // Verificar si la actividad existe
        const activity = yield database_1.default.getRepository(Activity_1.Activity).findOneBy({ activity_id });
        if (!activity) {
            res.status(404).json({ message: "Actividad no encontrada" });
            return;
        }
        // Verificar si el usuario ya está inscrito en esta actividad
        const existingRegistration = yield database_1.default.getRepository(Registration_1.Registration).findOneBy({
            user_id,
            activity_id,
        });
        if (existingRegistration) {
            res.status(400).json({ message: "Ya estás inscrito en esta actividad" });
            return;
        }
        // Crear la nueva inscripción sin incluir el 'registration_id' (lo asigna la base de datos)
        const registration = database_1.default.getRepository(Registration_1.Registration).create({
            user_id,
            activity_id,
            registration_date,
        });
        // Guardar la inscripción en la base de datos
        const savedRegistration = yield database_1.default.getRepository(Registration_1.Registration).save(registration);
        // Verificar si la inscripción se guardó correctamente
        if (!savedRegistration.registration_id) {
            res.status(500).json({ message: "No se pudo realizar la inscripción" });
            return;
        }
        // Devolver la inscripción creada con su ID generado automáticamente
        res.status(201).json({
            message: "Inscripción realizada con éxito",
            registration_id: savedRegistration.registration_id,
            registration: savedRegistration,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error al crear la inscripción:", error.message);
            res.status(500).json({ message: "Error al crear la inscripción", error: error.message });
        }
        else {
            console.error("Error desconocido", error);
            res.status(500).json({ message: "Error desconocido al crear la inscripción" });
        }
    }
});
exports.createRegistration = createRegistration;
