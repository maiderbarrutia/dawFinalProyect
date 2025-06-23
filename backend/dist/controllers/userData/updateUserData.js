"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserData = void 0;
const UserData_1 = require("../../entities/UserData");
const database_1 = __importDefault(require("../../config/database"));
const updateUserData = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const userData = await database_1.default.getRepository(UserData_1.UserData).findOneBy({ user_id: parseInt(id) });
        if (!userData) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        const updatedUserData = database_1.default.getRepository(UserData_1.UserData).merge(userData, updatedData);
        await database_1.default.getRepository(UserData_1.UserData).save(updatedUserData);
        res.status(200).json({ message: "Usuario actualizado exitosamente", updatedUserData });
    }
    catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ message: "Error al actualizar usuario", error });
    }
};
exports.updateUserData = updateUserData;
//# sourceMappingURL=updateUserData.js.map