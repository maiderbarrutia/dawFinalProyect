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
exports.updateCompany = void 0;
const Company_1 = require("../../entities/Company");
const database_1 = __importDefault(require("../../config/database"));
const updateCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const company = yield database_1.default.getRepository(Company_1.Company).findOneBy({ company_id: parseInt(id) });
        if (!company) {
            res.status(404).json({ message: "Empresa no encontrada" });
            return;
        }
        const updatedCompany = database_1.default.getRepository(Company_1.Company).merge(company, updatedData);
        yield database_1.default.getRepository(Company_1.Company).save(updatedCompany);
        res.status(200).json({ message: "Empresa actualizada exitosamente", updatedCompany });
    }
    catch (error) {
        console.error("Error al actualizar empresa:", error);
        res.status(500).json({ message: "Error al actualizar empresa", error });
    }
});
exports.updateCompany = updateCompany;
