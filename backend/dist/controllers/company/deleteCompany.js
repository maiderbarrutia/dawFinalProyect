"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompany = void 0;
const Company_1 = require("../../entities/Company");
const database_1 = __importDefault(require("../../config/database"));
const deleteCompany = async (req, res) => {
    const { id } = req.params;
    try {
        const company = await database_1.default.getRepository(Company_1.Company).findOneBy({ company_id: parseInt(id) });
        if (!company) {
            res.status(404).json({ message: "Empresa no encontrada" });
            return;
        }
        await database_1.default.getRepository(Company_1.Company).remove(company);
        res.status(200).json({ message: "Empresa eliminada exitosamente" });
    }
    catch (error) {
        console.error("Error al eliminar empresa:", error);
        res.status(500).json({ message: "Error al eliminar empresa", error });
    }
};
exports.deleteCompany = deleteCompany;
//# sourceMappingURL=deleteCompany.js.map