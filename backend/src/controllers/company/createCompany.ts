import { Request, Response } from "express";
import { Company } from "../../entities/Company";
import dataSource from "../../config/database";
import bcrypt from "bcrypt";

export const createCompany = async (req: Request, res: Response): Promise<void> => {
  const {
    company_name,
    company_type,
    company_logo,
    company_cif,
    contact_person,
    company_phone,
    company_address,
    company_website,
    company_email,
    company_password
  } = req.body;

  if (!company_name || !company_cif || !company_email || !company_password) {
    res.status(400).json({
      message: "El nombre, cif, email y contraseña de la empresa son obligatorios.",
    });
    return;
  }

  try {
    const CompanyRepo = dataSource.getRepository(Company);

    const emailExists = await CompanyRepo.findOne({ where: { company_email } });
    if (emailExists) {
      res.status(409).json({ message: "El correo electrónico ya está en uso." });
      return;
    }

    const CIFexist = await CompanyRepo.findOne({ where: { company_cif } });
    if (CIFexist) {
      res.status(409).json({ message: "El CIF ya está en uso." });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(company_password, salt);

    const company = CompanyRepo.create({
      company_name,
      company_type,
      company_logo,
      company_cif,
      contact_person,
      company_phone,
      company_address,
      company_website,
      company_email,
      company_password: hashPassword,
    });

    const newCompany = await CompanyRepo.save(company);

    const { company_password: _, ...companyWithoutPass } = newCompany;

    res.status(201).json({
      message: "Empresa creada exitosamente",
      company: companyWithoutPass,
    });
  } catch (error: any) {
    console.error("Error al crear empresa:", error);
    res.status(500).json({
      message: "Error al crear la empresa.",
      error: error.message || error,
    });
  }
};
