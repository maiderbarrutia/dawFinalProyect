"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanyById = void 0;
const Company_1 = require("../../entities/Company");
const database_1 = __importDefault(require("../../config/database"));
const getCompanyById = async (req, res) => {
    const { id } = req.params;
    try {
        const companyRepo = database_1.default.getRepository(Company_1.Company);
        const company = await companyRepo.findOne({ where: { company_id: parseInt(id) } });
        if (!company) {
            res.status(404).json({ message: "Empresa no encontrada" });
            return;
        }
        // Excluir la contraseña
        const { company_password, ...rest } = company;
        res.status(200).json(rest);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener empresa", error });
    }
};
exports.getCompanyById = getCompanyById;
//# sourceMappingURL=getCompanyById.js.map