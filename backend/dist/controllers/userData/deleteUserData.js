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
exports.deleteUserData = void 0;
const UserData_1 = require("../../entities/UserData");
const database_1 = __importDefault(require("../../config/database"));
const deleteUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const userData = yield database_1.default.getRepository(UserData_1.UserData).findOneBy({ user_id: parseInt(id) });
        if (!userData) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        yield database_1.default.getRepository(UserData_1.UserData).remove(userData);
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    }
    catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ message: "Error al eliminar usuario", error });
    }
});
exports.deleteUserData = deleteUserData;
