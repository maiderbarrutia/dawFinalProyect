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
exports.loginCompany = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const Company_1 = require("../../entities/Company");
const database_1 = __importDefault(require("../../config/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const loginCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { company_email, company_password } = req.body;
    try {
        // Verificar que los datos se han introducido
        if (!company_email || !company_password) {
            res.status(400).json({ message: 'Por favor, ingresa tanto el correo electrónico como la contraseña.' });
            return;
        }
        // Buscar la empresa por el email
        const repo = database_1.default.getRepository(Company_1.Company);
        const company = yield repo.findOne({ where: { company_email } });
        if (!company) {
            res.status(404).json({ message: 'Empresa no encontrada' });
            return;
        }
        // Verificar si la contraseña es correcta usando bcrypt.compare
        const validPass = yield bcrypt_1.default.compare(company_password, company.company_password);
        // Si la contraseña es incorrecta
        if (!validPass) {
            res.status(401).json({ message: 'Contraseña incorrecta' });
            return;
        }
        // Crear un token JWT
        const token = jsonwebtoken_1.default.sign({ id: company.company_id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        // Devolver el token al cliente
        res.status(200).json({ token });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error en login:", error.message);
            res.status(500).json({ message: 'Error en login. Inténtalo más tarde.', error: error.message });
        }
        else {
            console.error("Error inesperado:", error);
            res.status(500).json({ message: 'Error inesperado en el servidor.' });
        }
    }
});
exports.loginCompany = loginCompany;
