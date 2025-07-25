"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserData = void 0;
const UserData_1 = require("../../entities/UserData");
const database_1 = __importDefault(require("../../config/database"));
const createUserData = async (req, res) => {
    const { first_name, last_name, user_email, user_phone, user_city, privacy_policy } = req.body;
    // Validar de campos obligatorios
    if (!first_name || !last_name || !user_email || !user_phone || !user_city || privacy_policy === undefined) {
        res.status(400).json({ message: "Faltan campos obligatorios." });
        return;
    }
    // Validación de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user_email)) {
        res.status(400).json({ message: "Correo electrónico inválido." });
        return;
    }
    try {
        const userRepo = database_1.default.getRepository(UserData_1.UserData);
        // Verificar si ya existe un usuario con ese email
        const existingUser = await userRepo.findOneBy({ user_email });
        if (existingUser) {
            // Si ya existe, lo devolvemos sin crear uno nuevo
            res.status(200).json({
                message: "Usuario ya registrado",
                user_id: existingUser.user_id,
                userData: existingUser,
            });
            return;
        }
        // Si no existe, lo creamos
        const newUser = userRepo.create({
            first_name,
            last_name,
            user_email,
            user_phone,
            user_city,
            privacy_policy,
        });
        const savedUser = await userRepo.save(newUser);
        res.status(201).json({
            message: "Usuario creado exitosamente",
            user_id: savedUser.user_id,
            userData: savedUser,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error al crear usuario:", error.message);
            res.status(500).json({ message: "Error al crear usuario", error: error.message });
        }
        else {
            console.error("Error desconocido:", error);
            res.status(500).json({ message: "Error desconocido al crear usuario", error });
        }
    }
};
exports.createUserData = createUserData;
//# sourceMappingURL=createUserData.js.map