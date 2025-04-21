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

  // Recuperar el logo de la empresa si se ha subido un archivo (usamos undefined si no hay archivo)
  const company_logo = req.file ? req.file.filename : undefined;  // Use undefined instead of null

  // Validar de campos obligatorios
  if (!company_name || !company_cif || !company_email || !company_password) {
    res.status(400).send("El nombre, CIF, email y contraseña de la empresa son obligatorios.");
    return;
  }

  try {
    const CompanyRepo = dataSource.getRepository(Company);

    // Verificar si el email existe
    const emailExists = await CompanyRepo.findOne({ where: { company_email } });
    if (emailExists) {
      res.status(409).send("El correo electrónico ya está en uso.");
      return;
    }

    // Verificar si el CIF existe
    const CIFexist = await CompanyRepo.findOne({ where: { company_cif } });
    if (CIFexist) {
      res.status(409).send("El CIF ya está en uso.");
      return;
    }

    // CreaR un hash de la contraseña utilizando bcrypt para asegurarla
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(company_password, salt);

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

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al crear empresa:", error.message);
      res.status(500).json({ message: "Error al crear la empresa.", error: error.message });
    } else {
      console.error("Error desconocido al crear empresa:", error);
      res.status(500).json({ message: "Error desconocido al crear la empresa" });
    }
  }
};
