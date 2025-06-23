"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDataById = void 0;
const UserData_1 = require("../../entities/UserData");
const database_1 = __importDefault(require("../../config/database"));
const getUserDataById = async (req, res) => {
    const { id } = req.params;
    try {
        const userData = await database_1.default.getRepository(UserData_1.UserData).findOneBy({ user_id: parseInt(id) });
        if (!userData) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.status(200).json(userData);
    }
    catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ message: "Error al obtener usuario", error });
    }
};
exports.getUserDataById = getUserDataById;
//# sourceMappingURL=getUserDataById.js.map