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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompany = void 0;
const Company_1 = require("../../entities/Company");
const database_1 = __importDefault(require("../../config/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { company_name, company_type, company_cif, contact_person, company_phone, company_address, company_website, company_email, company_password, privacy_policy } = req.body;
    // Recuperar el logo de la empresa si se ha subido un archivo (usamos undefined si no hay archivo)
    const company_logo = req.file ? req.file.filename : undefined;
    // Validar campos obligatorios
    if (!company_name || !company_cif || !company_email || !company_password) {
        res.status(400).send("El nombre, CIF, email y contraseña de la empresa son obligatorios.");
        return;
    }
    try {
        const CompanyRepo = database_1.default.getRepository(Company_1.Company);
        const emailExists = yield CompanyRepo.findOne({ where: { company_email } });
        if (emailExists) {
            res.status(409).send("El correo electrónico ya está en uso.");
            return;
        }
        const CIFexist = yield CompanyRepo.findOne({ where: { company_cif } });
        if (CIFexist) {
            res.status(409).send("El CIF ya está en uso.");
            return;
        }
        // Crear un hash de la contraseña utilizando bcrypt para asegurarla
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashPassword = yield bcrypt_1.default.hash(company_password, salt);
        // Crear la nueva compañia sin incluir el 'company_id' (lo asigna la base de datos)
        const company = CompanyRepo.create({
            company_name,
            company_type,
            company_cif,
            contact_person,
            company_phone,
            company_address,
            company_website,
            company_email,
            company_password: hashPassword,
            privacy_policy,
            company_logo,
        });
        // Guardar la empresa en la base de datos
        const newCompany = yield CompanyRepo.save(company);
        // Si el método save() devuelve un array, cogemos el primer elemento
        const savedCompany = Array.isArray(newCompany) ? newCompany[0] : newCompany;
        // Desestructurar la empresa guardada para quitar la contraseña antes de enviarla al front
        const { company_password: _ } = savedCompany, companyWithoutPass = __rest(savedCompany, ["company_password"]);
        // Devolver la empresa creada
        res.status(201).json({
            message: "Empresa creada exitosamente",
            company: companyWithoutPass,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error al crear empresa:", error.message);
            res.status(500).json({ message: "Error al crear la empresa.", error: error.message });
        }
        else {
            console.error("Error desconocido al crear empresa:", error);
            res.status(500).json({ message: "Error desconocido al crear la empresa" });
        }
    }
});
exports.createCompany = createCompany;
