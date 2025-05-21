import { Request, Response } from "express";
import { Company } from "../../entities/Company";
import dataSource from "../../config/database";

export const updateCompany = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const company = await dataSource.getRepository(Company).findOneBy({ company_id: parseInt(id) });
      
      if (!company) {
        res.status(404).json({ message: "Empresa no encontrada" });
        return;
      }
  
      const updatedCompany = dataSource.getRepository(Company).merge(company, updatedData);

      await dataSource.getRepository(Company).save(updatedCompany);

      res.status(200).json({ message: "Empresa actualizada exitosamente", updatedCompany });

    } catch (error) {
      console.error("Error al actualizar empresa:", error);
      res.status(500).json({ message: "Error al actualizar empresa", error });
    }
  };