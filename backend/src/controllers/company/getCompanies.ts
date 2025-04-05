import { Request, Response } from "express";
import { Company } from "../../entities/Company";
import dataSource from "../../config/database";

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companyRepo = dataSource.getRepository(Company);
    const companies = await companyRepo.find();

    // Excluir la contraseña
    const cleaned = companies.map(({ company_password, ...rest }) => rest);

    res.status(200).json(cleaned);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener empresas", error });
  }
};