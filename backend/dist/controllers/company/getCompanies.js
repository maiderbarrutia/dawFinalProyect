"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanies = void 0;
const Company_1 = require("../../entities/Company");
const database_1 = __importDefault(require("../../config/database"));
const getCompanies = async (req, res) => {
    try {
        const companyRepo = database_1.default.getRepository(Company_1.Company);
        const companies = await companyRepo.find();
        // Excluir la contraseña
        const cleaned = companies.map(({ company_password, ...rest }) => rest);
        res.status(200).json(cleaned);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener empresas", error });
    }
};
exports.getCompanies = getCompanies;
//# sourceMappingURL=getCompanies.js.map