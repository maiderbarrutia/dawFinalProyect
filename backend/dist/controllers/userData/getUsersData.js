"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersData = void 0;
const UserData_1 = require("../../entities/UserData");
const database_1 = __importDefault(require("../../config/database"));
const getUsersData = async (req, res) => {
    try {
        const userData = await database_1.default.getRepository(UserData_1.UserData).find();
        res.status(200).json(userData);
    }
    catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error al obtener usuarios", error });
    }
};
exports.getUsersData = getUsersData;
//# sourceMappingURL=getUsersData.js.map