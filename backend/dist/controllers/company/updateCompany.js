"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompany = void 0;
const Company_1 = require("../../entities/Company");
const database_1 = __importDefault(require("../../config/database"));
const updateCompany = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const company = await database_1.default.getRepository(Company_1.Company).findOneBy({ company_id: parseInt(id) });
        if (!company) {
            res.status(404).json({ message: "Empresa no encontrada" });
            return;
        }
        const updatedCompany = database_1.default.getRepository(Company_1.Company).merge(company, updatedData);
        await database_1.default.getRepository(Company_1.Company).save(updatedCompany);
        res.status(200).json({ message: "Empresa actualizada exitosamente", updatedCompany });
    }
    catch (error) {
        console.error("Error al actualizar empresa:", error);
        res.status(500).json({ message: "Error al actualizar empresa", error });
    }
};
exports.updateCompany = updateCompany;
//# sourceMappingURL=updateCompany.js.map