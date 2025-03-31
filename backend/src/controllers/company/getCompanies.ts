import { Request, Response } from "express";
import { Company } from "../../entities/Company";
import dataSource from "../../config/database";

export const getCompanies = async (req: Request, res: Response): Promise<void> => {
    try {
      const empresas = await dataSource.getRepository(Company).find();
      res.status(200).json(empresas);
    } catch (error) {
      console.error("Error al obtener empresas:", error);
      res.status(500).json({ message: "Error al obtener empresas", error });
    }
};