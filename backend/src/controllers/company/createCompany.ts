import { Request, Response } from "express";
import { Company } from "../../entities/Company";
import dataSource from "../../config/database";
import bcrypt from "bcrypt";

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

  // Retrieve the company logo from the uploaded file
  const company_logo = req.file ? req.file.filename : undefined;  // Use undefined instead of null

  if (!company_name || !company_cif || !company_email || !company_password) {
    res.status(400).send("El nombre, CIF, email y contraseña de la empresa son obligatorios.");
    return;
  }

  try {
    const CompanyRepo = dataSource.getRepository(Company);

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

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(company_password, salt);

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
      company_logo,  // Only pass undefined or a string
    });

    const newCompany = await CompanyRepo.save(company);

    // If save() returns an array, take the first element
    const savedCompany = Array.isArray(newCompany) ? newCompany[0] : newCompany;

    // Destructure and remove the password
    const { company_password: _, ...companyWithoutPass } = savedCompany;

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
