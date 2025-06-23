"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompany = void 0;
const Company_1 = require("../../entities/Company");
const database_1 = __importDefault(require("../../config/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createCompany = async (req, res) => {
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
        const emailExists = await CompanyRepo.findOne({ where: { company_email } });
        if (emailExists) {
            res.status(409).send("El correo electrónico ya está en uso.");
            return;
        }
        const CIFexist = await CompanyRepo.findOne({ where: { company_cif } });
        if (CIFexist) {
            res.status(409).send("El CIF ya está en uso.");
            return;
        }
        // Crear un hash de la contraseña utilizando bcrypt para asegurarla
        const salt = await bcrypt_1.default.genSalt(10);
        const hashPassword = await bcrypt_1.default.hash(company_password, salt);
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
        const newCompany = await CompanyRepo.save(company);
        // Si el método save() devuelve un array, cogemos el primer elemento
        const savedCompany = Array.isArray(newCompany) ? newCompany[0] : newCompany;
        // Desestructurar la empresa guardada para quitar la contraseña antes de enviarla al front
        const { company_password: _, ...companyWithoutPass } = savedCompany;
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
};
exports.createCompany = createCompany;
//# sourceMappingURL=createCompany.js.map