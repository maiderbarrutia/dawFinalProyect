import { Request, Response } from "express";
import { Company } from "../../entities/Company";
import dataSource from "../../config/database";
import bcrypt from "bcrypt";
import { uploadToCloudinary } from '../../services/cloudinaryService';

export const createCompany = async (req: Request, res: Response): Promise<void> => {
  const {
    company_name,
    company_type,
    company_cif,
    contact_person,
    company_phone,
    company_address,
    company_website,
    company_email,
    company_password,
    privacy_policy
  } = req.body;

  let company_logo = undefined;

  if (req.file && req.file.path) {
    try {
      const cloudinaryUrl = await uploadToCloudinary(req.file.path, 'images');
      company_logo = cloudinaryUrl || req.file.filename;
    } catch (err) {
      console.error("Error subiendo a Cloudinary:", err);
      company_logo = req.file.filename;
    }
  }

  // Validar campos obligatorios
  if (!company_name || !company_cif || !company_email || !company_password) {
    res.status(400).json({
      message: "El nombre, CIF, email y contraseña de la empresa son obligatorios."
    });
  }

  try {
    const CompanyRepo = dataSource.getRepository(Company);
    const errores: string[] = [];

    const emailExists = await CompanyRepo.findOne({ where: { company_email } });
    if (emailExists) errores.push("El correo electrónico ya está en uso.");

    const CIFexist = await CompanyRepo.findOne({ where: { company_cif } });
    if (CIFexist) errores.push("El CIF ya está en uso.");

    if (errores.length > 0) {
      res.status(409).json({
        message: "Conflictos detectados",
        errores,
      });
    }

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(company_password, salt);

    // Crear y guardar la nueva empresa
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

    const savedCompany = await CompanyRepo.save(company);

    // Eliminar la contraseña del objeto antes de devolverlo
    const { company_password: _, ...companyWithoutPass } = savedCompany;

    res.status(201).json({
      message: "Empresa creada exitosamente",
      company: companyWithoutPass,
    });

  } catch (error) {
    console.error("Error al crear empresa:", error);
    res.status(500).json({
      message: "Error al crear la empresa.",
      error: error instanceof Error ? error.message : "Error desconocido"
    });
  }
};
