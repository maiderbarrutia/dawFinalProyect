import { Request, Response } from "express";
import { Company } from "../../entities/Company";
import dataSource from "../../config/database";

export const getCompanyById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const company = await dataSource.getRepository(Company).findOneBy({ company_id: parseInt(id) });
      if (!company) {
        res.status(404).json({ message: "Empresa no encontrada" });
        return;
      }
      res.status(200).json(company);
    } catch (error) {
      console.error("Error al obtener empresa:", error);
      res.status(500).json({ message: "Error al obtener empresa", error });
    }
  };