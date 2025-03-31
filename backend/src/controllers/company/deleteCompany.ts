import { Request, Response } from "express";
import { Company } from "../../entities/Company";
import dataSource from "../../config/database";

export const deleteCompany = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      const company = await dataSource.getRepository(Company).findOneBy({ company_id: parseInt(id) });
      if (!company) {
        res.status(404).json({ message: "Empresa no encontrada" });
        return;
      }
  
      await dataSource.getRepository(Company).remove(company);
      res.status(200).json({ message: "Empresa eliminada exitosamente" });
    } catch (error) {
      console.error("Error al eliminar empresa:", error);
      res.status(500).json({ message: "Error al eliminar empresa", error });
    }
  };